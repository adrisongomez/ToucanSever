const User = require("../user/user.model");

const {
  connect,
  dropDatabase,
  closeDatabase,
} = require("../../__mocks__/db.testHelper");

const {
  mockUserData,
  mockAlbum,
  mockResources,
} = require("../../__mocks__/utils.testHelper");

const getUser = async () => {
  return await User.create(mockUserData());
};

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

describe("Album SubDocument create ", () => {
  it("should work correctly", async () => {
    const user = await getUser();
    const albumSubDoc = user.albums;
    await albumSubDoc.create(mockAlbum());
  });
});
