const { addAlbum, deleteAlbum, getAlbum } = require("./album.controller");
const { mockUserData, mockAlbum } = require("../../__mocks__/utils.testHelper");

const getStuff = () => {
  const idParent = "12345";
  const user = mockUserData();
  const album = mockAlbum();
  const idAlbum = 12;
  return { idParent, user, album, idAlbum };
};

describe("addAlbumToUserDoc", () => {
  it("should work correctly", async () => {
    const { idParent, user, album } = getStuff();
    const mockDoc = {
      albums: {
        create: (obj) => obj,
        push: (obj) => {
          user.albums.push(obj);
        },
      },
      save: () => Promise.resolve(user),
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    const result = await addAlbum(idParent, album, mockModel);
    expect(result).toBe(user);
    expect(result.albums).toContain(album);
  });

  it("should not work correctly, Parent not exists", async () => {
    const { idParent, album } = getStuff();
    const mockModel = {
      findById: (id) => Promise.reject({ path: "_id" }),
    };
    try {
      await addAlbum(idParent, album, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
    }
  });

  it("should not work correctly, Album validation", async () => {
    const { idParent, album } = getStuff();
    const mockDoc = {
      albums: {
        create: (obj) => obj,
        push: (obj) => {},
      },
      save: () =>
        Promise.reject({
          errors: {
            "albums.0.name": {
              message: "Path 'name' is required",
            },
          },
        }),
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    try {
      await addAlbum(idParent, {}, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.errors.name).toBe("Name is required");
    }
  });
});

describe("deleteAlbum controller", () => {
  it("should work correctly", async () => {
    const { idParent, album, user, idAlbum } = getStuff();
    const mockDoc = {
      albums: {
        id: (obj) => ({
          remove: () => album,
        }),
      },
      save: () => Promise.resolve(user),
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    const result = await deleteAlbum(idAlbum, idParent, mockModel);
    expect(result.albums).not.toContain(album);
  });

  it("should not work correctly, Parent not exists", async () => {
    const { idParent, idAlbum } = getStuff();
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    try {
      await deleteAlbum(idAlbum, idParent, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
    }
  });

  it("should not work correctly, Album not exists", async () => {
    const { idParent, idAlbum } = getStuff();
    const mockDoc = {
      albums: {
        id: (id) => null,
      },
    };
    const mockModel = {
      findById: (obj) => Promise.resolve(mockDoc),
    };
    try {
      await deleteAlbum(idAlbum, idParent, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Album not exists");
    }
  });
});

describe("getAlbum controller", () => {
  it("should work correctly", async () => {
    const { idParent, album, idAlbum } = getStuff();
    const mockDoc = {
      albums: {
        id: (id) => album,
      },
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    const result = await getAlbum(idAlbum, idParent, mockModel);
    expect(result).toBe(album);
  });

  it("should not work correctly, Parent not exists", (done) => {
    const { idParent, idAlbum } = getStuff();
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    getAlbum(idAlbum, idParent, mockModel).catch((error) => {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Parent not exists");
      done();
    });
  });

  it("should not work correctly, Album not exists", (done) => {
    const { idParent, idAlbum } = getStuff();
    const mockDoc = {
      albums: {
        id: (id) => null,
      },
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    getAlbum(idAlbum, idParent, mockModel).catch((error) => {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Album not exists");
      done()
    });
  });
});
