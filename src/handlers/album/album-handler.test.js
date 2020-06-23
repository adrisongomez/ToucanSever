const httpMock = require("node-mocks-http");
const { mockAlbum, mockUserData } = require("../../__mocks__/utils.testHelper");
const {
  addAlbumToUser,
  getAlbumFromUser,
  deleteAlbumFromUser,
} = require("./album.handler");

const getNextAndRes = () => {
  const res = httpMock.createResponse();
  const next = ({ status, error }) => {
    res.status(status).json(error);
  };
  return { next, res };
};

const album = mockAlbum();
const user = mockUserData();
const parentId = 1;

describe("createAlbum handler", () => {
  const req = httpMock.createRequest({
    method: "POST",
    params: {
      idParent: parentId,
    },
    body: {
      ...album,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = getNextAndRes();
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
    await addAlbumToUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(data).toStrictEqual(user);
  });

  it("should not work correctly, Parent not exists", async () => {
    const { res, next } = getNextAndRes();
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    await addAlbumToUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(400);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Parent not exists");
  });
  it("should not work correctly, Validation Album", async () => {
    const { res, next } = getNextAndRes();
    const mockDoc = {
      albums: {
        create: (obj) => obj,
        push: () => {},
      },
      save: () =>
        Promise.reject({
          errors: {
            "albums.0.name": true,
          },
        }),
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    await addAlbumToUser(mockModel)(req, res, next);
    const status = res._getStatusCode();
    const data = res._getJSONData();
    expect(status).toBe(400);
    expect(data.id).toBe(1);
    expect(data.errors.name).toBeDefined();
  });
});

describe("getAlbumFromUser", () => {
  const req = httpMock.createRequest({
    method: "GET",
    params: {
      idParent: parentId,
      idAlbum: 1,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = getNextAndRes();
    const mockDoc = {
      albums: {
        id: (obj) => album,
      },
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    await getAlbumFromUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(200);
    expect(data).toStrictEqual(album);
  });

  it("should not work correclty, Parent not exists", async () => {
    const { next, res } = getNextAndRes();
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    await getAlbumFromUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Parent not exists");
  });

  it("should not work correctly, Album not exists", async () => {
    const { next, res } = getNextAndRes();
    const mockDoc = {
      albums: {
        id: () => null,
      },
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    await getAlbumFromUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Album not exists");
  });
});

describe("deleteAlbumUser hanlder", () => {
  const req = httpMock.createRequest({
    method: "DELETE",
    params: {
      idParent: parentId,
      idAlbum: 1,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = getNextAndRes();
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
    await deleteAlbumFromUser(mockModel)(req, res, next);
    const status = res._getStatusCode();
    const data = res._getJSONData();
    expect(status).toBe(200);
    expect(data).toStrictEqual(user);
  });

  it("should not work correctly, Parent not exists", async () => {
    const { res, next } = getNextAndRes();
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    await deleteAlbumFromUser(mockModel)(req, res, next);
    const status = res._getStatusCode();
    const data = res._getJSONData();
    expect(status).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Parent not exists");
  });

  it("should not work correctly, Album not exists", async () => {
    const { res, next } = getNextAndRes();
    const mockDoc = {
      albums: {
        id: () => null,
      },
    };
    const mockModel = {
      findById: () => Promise.resolve(mockDoc),
    };
    await deleteAlbumFromUser(mockModel)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Album not exists");
  });
});
