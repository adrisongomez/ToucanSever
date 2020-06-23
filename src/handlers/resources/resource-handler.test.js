const httpMocks = require("node-mocks-http");
const {
  getResourceFromAlbum,
  addResourceToAlbum,
  deleteResourceFromAlbum,
} = require("./resource.handler");
const {
  mockAlbum,
  mockResources,
  mockUserData,
} = require("../../__mocks__/utils.testHelper");

const getReqAndRes = () => {
  const res = httpMocks.createResponse();
  const next = ({ status, error }) => {
    res.status(status).json(error);
  };
  return { res, next };
};

const idParent = 1;
const idAlbum = 1;
const idResource = 1;
const album = mockAlbum();
const resource = mockResources();
const user = mockUserData();

describe("getAlbumFromUser handler", () => {
  const req = httpMocks.createRequest({
    method: "GET",
    params: {
      idParent,
      idAlbum,
      idResource,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = getReqAndRes();
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
    await getResourceFromAlbum(mockModel)(req, res, next);
    const status = res._getStatusCode();
    const result = res._getJSONData();
    expect(status).toBe(200);
    expect(result).toStrictEqual(resource);
  });
});

describe("addResourceToAlbum handler", () => {
  const req = httpMocks.createRequest({
    method: "POST",
    params: {
      idParent,
      idAlbum,
    },
    body: {
      ...resource,
    },
  });

  it("should work correctly", async () => {
    const { res, next } = getReqAndRes();
    const mockDoc = {
      albums: {
        id: (id) => ({
          resources: {
            create: (obj) => obj,
            push: (obj) => {
              album.resources.push(obj);
              user.albums.push(album);
            },
          },
        }),
      },
      save: (obj) => {
        return Promise.resolve(user);
      },
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    await addResourceToAlbum(mockModel)(req, res, next);
    const result = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(201);
    expect(result).toStrictEqual(user);
  });
});

describe("deleteResourceFromAlbum handler", () => {
  const req = httpMocks.createRequest({
    method: "DELETE",
    params: {
      idParent,
      idAlbum,
      idResource,
    },
  });

  it("should work correctly", async () => {
    const { res, next } = getReqAndRes();
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
      save: () => Promise.resolve(user),
    };
    const mockModel = {
      findById: (id) => Promise.resolve(mockDoc),
    };
    await deleteResourceFromAlbum(mockModel)(req, res, next);
    const status = res._getStatusCode();
    const result = res._getJSONData();
    expect(status).toBe(200);
    expect(result).toStrictEqual(user);
  });
});
