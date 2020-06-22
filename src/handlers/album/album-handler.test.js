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
    console.log(data);
    expect(status).toBe(200);
    expect(data).toStrictEqual(album);
  });
});

describe("deleteAlbumUser hanlder", async () => {
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
});
