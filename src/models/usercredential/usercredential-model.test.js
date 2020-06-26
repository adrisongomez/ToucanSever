const User = require("../user/user.model");
const UserCredential = require("./usercredential.model");
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
  return { user, userCredentialData, passwordNotValid };
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
});
