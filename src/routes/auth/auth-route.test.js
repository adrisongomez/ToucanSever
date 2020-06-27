const axios = require("axios").default;

const {
  createTestApp,
  addGenericRoute,
} = require("../../__mocks__/app.testHelper");
const {
  connect,
  dropDatabase,
  closeDatabase,
} = require("../../__mocks__/db.testHelper");
const {
  mockUserData,
  mockUserCredentialData,
} = require("../../__mocks__/utils.testHelper");

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
    const { data, status } = await axios.post(url, {
      email: email,
      password: credential.password,
    });
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
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