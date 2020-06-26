const User = require("../user/user.model");
const UserCredential = require("./credential.model");
const { compareSync } = require("bcrypt");
const {
  dropDatabase,
  closeDatabase,
  connect,
} = require("../../__mocks__/db.testHelper");
const {
  mockUserData,
  mockUserCredentialData,
} = require("../../__mocks__/utils.testHelper");

beforeAll(async () => {
  await connect();
  await dropDatabase();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

const Stuff = async () => {
  const user = await User.create(mockUserData());
  const userCredentialData = new mockUserCredentialData();
  const passwordNotValid = "1234567";
  return {
    user,
    userCredentialData,
    passwordNotValid,
    usernameNotValid: "asdasd/154645@",
    userIdNotValid: "123456789",
  };
};

describe("Create UserCrendetial", () => {
  it("should work correctly", async () => {
    const { user, userCredentialData } = await Stuff();
    const doc = {
      user: user._id,
      ...userCredentialData,
    };
    const credential = await UserCredential.create(doc);
    expect(credential.username).toBe(userCredentialData.username);
    expect(
      compareSync(userCredentialData.password, credential.password)
    ).toBeTruthy();
  });

  it("should not work correclt, Username validation", async () => {
    const { user, userCredentialData, usernameNotValid } = await Stuff();
    const doc = {
      user: user._id,
      ...userCredentialData,
      username: usernameNotValid,
    };
    try {
      await UserCredential.create(doc);
    } catch (error) {
      expect(error.errors.username).toBeDefined();
    }
  });

  it("should not work correctly, Password validation", async () => {
    const { user, userCredentialData, passwordNotValid } = await Stuff();
    const doc = {
      user: user._id,
      password: passwordNotValid,
      ...userCredentialData,
    };
    try {
      await UserCredential.create(doc);
    } catch (error) {
      expect(error.errors.password).toBeDefined();
    }
  });

  it("should not work correctly, User valid", async () => {
    const { userIdNotValid, userCredentialData } = await Stuff();
    const doc = {
      user: userIdNotValid,
      ...userCredentialData,
    };
    try {
      await UserCredential.create(doc);
    } catch (error) {
      expect(error.errors.user).toBeDefined();
    }
  });
});

describe("isValidUser method", () => {
  it("should work correclty", async () => {
    const { user, userCredentialData } = await Stuff();
    const doc = {
      user: user._id,
      ...userCredentialData,
    };
    await UserCredential.create(doc);
    const resp = await UserCredential.isValidUser({
      username: userCredentialData.username,
      password: userCredentialData.password,
    });
    expect(resp).toBeTruthy();
  });

  it("should not work correctly, Different Password", async () => {
    const { user, userCredentialData, passwordNotValid } = await Stuff();
    const doc = {
      user: user._id,
      ...userCredentialData,
    };
    await UserCredential.create(doc);
    const resp = await UserCredential.isValidUser({
      username: userCredentialData.username,
      password: passwordNotValid,
    });
    expect(resp).toBeFalsy();
  });

  it("should not work correctly, Not valid username", async () => {
    const { user, userCredentialData, usernameNotValid } = await Stuff();
    const doc = {
      user: user._id,
      ...userCredentialData,
    };
    await UserCredential.create(doc);
    const resp = await UserCredential.isValidUser({
      username: usernameNotValid,
      password: userCredentialData.password,
    });
    expect(resp).toBeFalsy();
  });
});
