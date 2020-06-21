const Parent = require("../user/user.model");

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
  const parent = await Parent.create(mockUserData());
  const alb = mockAlbum();
  const resource = mockResources();
  const albumSubDoc = parent.albums;
  const album = albumSubDoc.create(alb);
  albumSubDoc.push(album);
  await album.parent().save();
  const resourceSubDoc = albumSubDoc[0].resources;
  return { album, parent, resource, resourceSubDoc };
};

describe("Resource SubDocument create ", () => {
  it("should work correctly", async () => {
    const { resourceSubDoc, resource } = await getTestStuff();
    const result = await resourceSubDoc.create(resource);
    resourceSubDoc.push(result);
    await result.parent().parent().save();
    expect(result._id).toBeDefined();
    expect(result.url).toBe(resource.url);
    expect(result.type).toBe(resource.type);
  });

  it("should not work correctly, validators work", async () => {
    const { resourceSubDoc, resource } = await getTestStuff();
    const length = resourceSubDoc.length;
    resource.type = "load";
    resource.url = "url";
    const result = resourceSubDoc.create(resource);
    resourceSubDoc.push(result);
    try {
      await result.parent().parent().save();
    } catch (error) {
      expect(error.errors[`albums.0.resources.${length}.type`]).toBeDefined();
      expect(error.errors[`albums.0.resources.${length}.url`]).toBeDefined();
    }
  });
});

describe("Resource SubDocument delete", () => {
  it("should work correctly", async () => {
    const { resourceSubDoc } = await getTestStuff();
    const result = resourceSubDoc.id(resourceSubDoc[0].id).remove();
    await result.parent().parent().save();
    expect(resourceSubDoc).not.toContain(result);
  });

  it("shouldn't work correctly, Resource Id no exits", async () => {
    const { resourceSubDoc } = await getTestStuff();
    try {
      const result = resourceSubDoc.id(123).remove();
      expect(result).toBeNull();
      await result.parent().parent().save();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe("Resource SubDocument find", () => {
  it("should work correctly", async () => {
    const { resourceSubDoc } = await getTestStuff();
    const result = resourceSubDoc.id(resourceSubDoc[0]);
    expect(result).toBeDefined();
    expect(resourceSubDoc).toContain(result);
  });

  it("shoudl not work correctly, Resource Id no exists", async () => {
    const { resourceSubDoc } = await getTestStuff();
    const result = resourceSubDoc.id(123231546);
    expect(result).toBe(null);
  });
});

describe("Resource SubDocument Update", () => {
  it("should work correctly", async () => {
    const { album, resourceSubDoc } = await getTestStuff();
    const result = resourceSubDoc.id(resourceSubDoc[0]);
    result.type = "video";
    result.url = "https://google.com";
    album.resources = resourceSubDoc;
    await result.parent().parent().save();
    expect(resourceSubDoc).toContain(result);
  });

  it("should not work correctly", async () => {
    const { resourceSubDoc, album } = await getTestStuff();
    const result = resourceSubDoc.id(resourceSubDoc[0]);
    result.type = "";
    result.url = "asda";
    album.resources = resourceSubDoc;
    const res = result.parent().parent().save();
    expect(res).rejects.toThrowError();
  });
});
