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

const getTestStuff = async () => {
  const user = await User.create(mockUserData());
  const album = mockAlbum();
  const albumSubDoc = user.albums;
  const result = await albumSubDoc.create(album);
  albumSubDoc.push(result);
  await result.parent().save();
  return { user, albumSubDoc, album };
};

describe("Album SubDocument create ", () => {
  it("should work correctly", async () => {
    const { user, albumSubDoc, album } = await getTestStuff();
    const result = await albumSubDoc.create(album);
    user.albums.push(result);
    await user.save();
    expect(result._id).toBeDefined();
    expect(result.name).toBe(album.name);
    expect(result.resources[0].type).toBe(album.resources[0].type);
  });

  it("should not work correctly, name empty", async () => {
    const { albumSubDoc } = await getTestStuff();
    try {
      const result = albumSubDoc.create({});
      albumSubDoc.push(result);
      await result.parent().save();
      expect(0).toBe(1); // Make sure that expect it's gonna run;
    } catch (error) {
      expect(error.errors["albums.1.name"]).toBeDefined();
    }
  });
});

describe("Album SubDocument find", () => {
  it("should work correctly", async () => {
    const { albumSubDoc } = await getTestStuff();
    const album = albumSubDoc.id(albumSubDoc[0]._id);
    expect(album).toBeDefined();
    expect(albumSubDoc).toContain(album);
  });

  it("it should not worck correctly, album not exists", async () => {
    const { albumSubDoc } = await getTestStuff();
    const album = albumSubDoc.id(123);
    expect(album).toBeNull();
  });
});

describe("Album SudDocument update", () => {
  it("should work correctly", async () => {
    const { albumSubDoc } = await getTestStuff();
    const album = albumSubDoc.id(albumSubDoc[0]);
    album.name = "sasy";
    await album.parent().save();
    expect(albumSubDoc).toContain(album);
  });

  it("should not work subDocument update, Name not valid", async () => {
    const { albumSubDoc } = await getTestStuff();
    const length = albumSubDoc.length;
    const album = albumSubDoc.id(albumSubDoc[0]);
    album.name = "";
    try {
      await album.parent().save();
      throw "algo paso";
    } catch (error) {
      expect(error.errors[`albums.${length-1}.name`]).toBeDefined();
    }
  });
});
