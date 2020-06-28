const axios = require("axios").default;

const { accessJWTGenerator, isAccessJWT, refreshJWTGenerator } = require("../../auth/generator/auth");
const { createTestApp, addGenericRoute } = require("../../__mocks__/app.testHelper");
const { connect, dropDatabase, closeDatabase } = require("../../__mocks__/db.testHelper");
const { mockUserData, mockUserCredentialData } = require("../../__mocks__/utils.testHelper");

//model

const User = require("../../models/user/user.model");
const Credential = require("../../models/credential/credential.model");

//routes
const AuthRoute = require("./auth.route");

const port = 3330;

const endpoint = `http://localhost:${port}`;
// setup server test

const app = createTestApp();
app.use("/", AuthRoute);
addGenericRoute(app);
const server = app.listen(port);

const Stuff = async () => {
  const user = await User.create(mockUserData());
  const credential = new mockUserCredentialData();
  await Credential.create({ ...credential, user: user._id });
  return { user, credential };
};

beforeAll(async () => {
  await connect();
  await dropDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
  server.close();
});

describe("Auth Login works", () => {
  const url = `${endpoint}/credential/login`;
  test("/credential/login POST Username and password valid", async () => {
    const { credential } = await Stuff();
    const { data, status } = await axios.post(url, {
      username: credential.username,
      password: credential.password,
    });
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
  });
  test("/credential/login POST email and password valid", async () => {
    const {
      credential,
      user: { email },
    } = await Stuff();
    const response = await axios.post(url, {
      email: email,
      password: credential.password,
    });
    const { status, data, headers } = response;
    expect(status).toBe(200);
    expect(headers["set-cookie"]).toBeDefined();
    expect(data.status).toBe("ok");
    expect(isAccessJWT(data.accessToken));
  });

  test("/credential/login POST username or email not valid or empty", async () => {
    const { credential } = await Stuff();
    try {
      await axios.post(url, {
        username: "notValidUsername@",
        password: credential.password,
      });
    } catch ({ response: { status, data } }) {
      expect(status).toBe(403);
      expect(data.status).toBe("fail");
    }
  });

  test("/credential/login POST password not valid", async () => {
    const { credential } = await Stuff();
    try {
      await axios.post(url, {
        username: credential.username,
        password: "notValidPassword@",
      });
    } catch ({ response: { status, data } }) {
      expect(status).toBe(403);
      expect(data.status).toBe("fail");
      expect(data.token).not.toBeDefined();
    }
  });
});

describe("Auth logout works", () => {
  const url = `${endpoint}/credential/logout`;
  it("/credential/logout DELETE works", async () => {
    const {
      credential,
      user: { _id },
    } = await Stuff();
    const accessToken = accessJWTGenerator({ username: credential.username, user: _id });
    const { data, status } = await axios.delete(url, { headers: { authorization: `Beare ${accessToken}` } });
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
  });

  it("/credential/logout DELETE not work, not accessToken or invalid accessToken", async () => {
    try {
      await axios.delete(url);
      expect(0).toBe(1);
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      expect(status).toBe(401);
      expect(data.status).toBe("fail");
    }
  });
});

describe("Auth refershToken work", () => {
  const url = `${endpoint}/refresh`;
  test("/refresh GET works", async () => {
    const {
      credential,
      user: { _id },
    } = await Stuff();
    const refreshToken = refreshJWTGenerator({ username: credential.username, user: _id });
    const { data, status } = await axios.get(url, {
      headers: {
        Cookie: `wjt=${refreshToken};`,
      },
    });
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
    expect(isAccessJWT(data.accessToken)).toBeTruthy();
  });

  test("/refresh GET no work, refreshToken not valid or payload not valid", async () => {
    try {
      await axios.get(url, {
        headers: {
          Cookie: "wjt:NOT-VALID-TOKEN",
        },
      });
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(401);
      expect(data.status).toBe("fail");
    }
  });
});
