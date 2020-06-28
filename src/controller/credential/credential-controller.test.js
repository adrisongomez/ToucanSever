const {
  mockUserCredentialData,
  mockUserData,
} = require("../../__mocks__/utils.testHelper");
const {
  createCredential,
  loginCredential,
  loginEmail,
} = require("./credential.controller");
const { hashSync } = require("bcrypt");

const { username, password } = new mockUserCredentialData();
const _id = "1231323465654";
const idUser = "asdasdasd13asd3as2d13a2sd";
const user = mockUserData();

describe("createCredential controller", () => {
  it("should work correclty", async () => {
    const mockModel = {
      create: (obj) =>
        Promise.resolve({ _id, ...obj, password: hashSync(obj.password, 10) }),
    };
    const result = await createCredential(
      username,
      password,
      idUser,
      mockModel
    );
    expect(result.status).toBe("new");
  });
  it("should not work correctly, validation Username or User unique credential", async () => {
    const mockModel = {
      create: (obj) => Promise.reject({ code: 11000 }),
    };
    try {
      await createCredential(username, password, idUser, mockModel);
    } catch (error) {
      expect(error.credential).toBeDefined();
      expect(error.credential.unique).toBeDefined();
    }
  });

  it("should not work correclty, password validation too short", async () => {
    const mockModel = {
      create: (obj) =>
        Promise.reject({
          errors: { password: { message: "Password too short" } },
        }),
    };
    try {
      await createCredential(username, password, idUser, mockModel);
    } catch (error) {
      expect(error.credential.password).toBeDefined();
    }
  });

  it("should not work correctly, username not valid", async () => {
    const mockModel = {
      create: (obj) =>
        Promise.reject({
          errors: {
            username: { message: "Username not valid" },
          },
        }),
    };
    try {
      await createCredential(username, password, idUser, mockModel);
    } catch (error) {
      expect(error.credential.password).toBeDefined();
    }
  });
});

describe("loginCredential controller", () => {
  it("should work correctly", async () => {
    const mockModel = {
      isValid: (obj) => Promise.resolve(true),
    };
    const resp = await loginCredential(username, password, mockModel);
    expect(resp.status).toBe("ok");
    expect(resp.message).toBe("User logged");
  });

  it("should not work correctly, isNotValid credential", async () => {
    const mockModel = {
      isValid: (obj) => Promise.resolve(false),
    };
    try {
      await loginCredential(username, password, mockModel);
    } catch (error) {
      expect(error.status).toBe("fail");
      expect(error.message).toBe("username or password are not valid");
      expect(error.tokken).not.toBeDefined();
    }
  });
});

describe("loginEmail controller", () => {
  const email = "asdasda@k.com";
  it("should work correctly", async () => {
    const mockModelUser = {
      findOne: (obj) => Promise.resolve(user),
    };
    const mockModelCredential = {
      findOne: (obj) => Promise.resolve({ username, password }),
      isValid: (obj) => Promise.resolve(true),
    };
    const resp = await loginEmail(
      email,
      password,
      mockModelCredential,
      mockModelUser
    );
    expect(resp.status).toBe("ok");
    expect(resp.message).toBe("User logged");
  });
  it("should not work correctly, userNotExists", async () => {
    const mockModelUser = {
      findOne: (obj) => Promise.resolve(null),
    };
    const mockModelCredential = {
      findOne: (obj) => Promise.resolve({ username, password }),
      isValid: (obj) => Promise.resolve(true),
    };
    const resp = await loginEmail(
      email,
      password,
      mockModelCredential,
      mockModelUser
    );
    expect(resp.status).toBe("fail");
    expect(resp.message).toBe("User not exists");
    expect(resp.tokken).not.toBeDefined();
  });
});
