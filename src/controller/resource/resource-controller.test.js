const {
  getResource,
  deleteResource,
  addResource: addResourceToAlbum,
} = require("./resource.controller");

const {
  mockResources,
  mockUserData,
  mockAlbum,
} = require("../../__mocks__/utils.testHelper");

const resource = mockResources();
const album = mockAlbum();
const userData = mockUserData();
const idParent = 1;
const idAlbum = 1;
const idResource = 1;

describe("getResource controller", () => {
  it("should work correctly", async () => {
    const mockDoc = {
      albums: {
        id: () => ({
          resources: {
            id: (id) => resource,
          },
        }),
      },
    };
    const mockModel = {
      findById: (obj) => Promise.resolve(mockDoc),
    };
    const result = await getResource(idParent, idAlbum, idResource, mockModel);
    expect(result).toBe(resource);
  });

  it("should not work correctly, Parent Id no exists ", async () => {
    const mockModel = {
      findById: (id) =>
        Promise.reject({
          path: "_id",
        }),
    };
    try {
      await getResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
    }
  });

  it("should not work correctly, Album Id no valid", async () => {
    const mockDoc = {
      albums: {
        id: (id) => null,
      },
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    try {
      await getResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Album not exists");
    }
  });

  it("should not work correctly, Resource id not valid", async () => {
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            id: (id) => null,
          },
        }),
      },
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    try {
      await getResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Resource not exists");
    }
  });
});

describe("deleteResource controller", () => {
  it("should work correctly", async () => {
    const parent = userData;
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            id: (id) => ({
              remove: (id) => resource,
            }),
          },
        }),
      },
      save: () => Promise.resolve(parent),
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    const result = await deleteResource(
      idParent,
      idAlbum,
      idResource,
      mockModel
    );
    expect(result).toBe(parent);
  });

  it("should not work correctly, Parent not exists", async () => {
    const mockModel = {
      findById: (id) => Promise.reject({ path: "_id" }),
    };
    try {
      await deleteResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
    }
  });

  it("should not work correctly, Album no exists", async () => {
    const mockDoc = {
      albums: {
        id: (id) => null,
      },
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    try {
      await deleteResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Album not exists");
    }
  });

  it("should not work correctly, Resource not exists", async () => {
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            id: (id) => null,
          },
        }),
      },
    };
    const mockModel = {
      findById: (_id) => Promise.resolve(mockDoc),
    };
    try {
      await deleteResource(idParent, idAlbum, idResource, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Resource not exists");
    }
  });
});

describe("addResourceToAlbum controller", () => {
  it("should work correctly", async () => {
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            create: (obj) => obj,
            push: (obj) => {
              album.resources.push(obj);
              userData.albums.push(album);
            },
          },
        }),
      },
      save: (obj) => Promise.resolve(userData),
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    const result = await addResourceToAlbum(
      resource,
      idAlbum,
      idParent,
      mockModel
    );
    expect(result.albums).toContain(album);
    expect(album.resources).toContain(resource);
  });

  it("should not work correctly, Parent not exists", async () => {
    const mockModel = {
      findById: (id) => Promise.reject({ path: "_id" }),
    };
    try {
      await addResourceToAlbum({}, idAlbum, idParent, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
    }
  });
  it("should not work correctly, Albums not exists", async () => {
    const mockDoc = {
      albums: {
        id: (id) => null,
      },
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    try {
      await addResourceToAlbum({}, idAlbum, idParent, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Album not exists");
    }
  });

  it("should not work correclty, Resource validation", async () => {
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            create: (obj) => obj,
            push: (obj) => {
              album.resources.push(obj);
              userData.albums.push(album);
            },
          },
        }),
      },
      save: () =>
        Promise.reject({
          errors: {
            "albums.0.resources.0.type": {
              message: "This types is not allowed",
            },
            "albums.0.resources.0.url": {
              message: "Url not valid",
            },
          },
        }),
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };

    try {
      await addResourceToAlbum({}, idAlbum, idParent, mockModel);
    } catch (error) {
      expect(error.errors).toBeDefined();
      expect(error.errors.type).toBe(
        "This type is not allowed. ('video' or 'image')"
      );
      expect(error.errors.url).toBe("Url not valid");
    }
  });
});
