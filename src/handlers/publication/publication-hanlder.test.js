const httpMocks = require("node-mocks-http");
const {
  createPublication,
  addCommentToPublication,
  deletePublications,
  getAllPublication,
  findPublication,
  findPublicationByUserId,
  updatePublication,
} = require("./publication.handler");
const {
  mockPublication,
  mockCommentsData,
  mockUserData,
} = require("../../__mocks__/utils.testHelper");

describe("Publication create", () => {
  it("work correctly", async () => {
    const publication = mockPublication("112223344455");
    const req = httpMocks.createRequest({
      method: "POST",
      url: "api/publication/",
      body: {
        ...publication,
      },
    });
    const idPub = "1231456126";
    const mockModel = {
      create: () =>
        Promise.resolve({
          populate: (a, b) => ({
            execPopulate: () => {
              return { _id: idPub, ...publication };
            },
          }),
        }),
    };
    const res = httpMocks.createResponse();
    await createPublication(mockModel)(req, res, () => {});
    const data = res._getJSONData();
    expect(data._id).toBe(idPub);
    expect(res.statusCode).toBe(201);
  });

  it("work incorrectly, empty request", async () => {
    const descriptionMsj = "Description is not valid";
    const authorMsj = "Author is not valid";

    const error = {
      errors: {
        description: {
          message: descriptionMsj,
        },
        author: {
          message: authorMsj,
        },
      },
    };

    const mockPublicationModel = {
      create: (obj) => Promise.reject(error),
    };

    const req = httpMocks.createRequest({
      method: "POST",
      body: {},
      url: "/api/publication/",
    });

    const res = httpMocks.createResponse();
    const next = (obj) => {
      res.status(obj.status).json(obj.error);
    };

    await createPublication(mockPublicationModel)(req, res, next);
    const { errors } = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(errors.author).toBe(authorMsj);
    expect(errors.description).toBe(descriptionMsj);
  });
});

describe("Publications delete", () => {
  const mockIdPub = "123154654564789416548";

  it("work correctly", async () => {
    const mockModel = {
      deleteOne: (obj) => Promise.resolve(),
    };

    const req = httpMocks.createRequest({
      method: "DELETE",
      params: {
        idPublications: mockIdPub,
      },
      url: "/api/publication/",
    });
    const res = httpMocks.createResponse();

    await deletePublications(mockModel)(req, res, () => {});
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result.id).toBe(0);
    expect(result.message).toBe("Publication deleted successfully");
  });

  it("work incorrectly, Publication not valid", async () => {
    const mockModel = {
      deleteOne: (obj) => Promise.reject(),
    };

    const req = httpMocks.createRequest({
      method: "DELETE",
      params: {
        idPublications: mockIdPub,
      },
      url: "/api/publication/",
    });
    const res = httpMocks.createResponse();
    const next = (obj) => {
      res.status(obj.status).json(obj.error);
    };

    await deletePublications(mockModel)(req, res, next);
    const result = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(result.id).toBe(1);
    expect(result.message).toBe("Publication not exists");
  });
});

describe("Get publications for User", () => {
  const mockUser = mockUserData();
  const mockIdUser = "12312465465465";
  const mockPub = Array.from(Array(5), () => mockPublication(mockIdUser));
  it("work correctly", async () => {
    const mockUserModel = {
      findById: (_id) => Promise.resolve({ _id, ...mockUser }),
    };
    const mockPublicationModel = {
      find: (obj) => Promise.resolve(mockPub),
    };

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/publication",
      params: {
        idUser: mockIdUser,
      },
    });

    const res = httpMocks.createResponse();

    const next = (obj) => {};

    await getAllPublication(mockPublicationModel, mockUserModel)(
      req,
      res,
      next
    );
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result.length).toBe(5);
  });

  it("work incorrectly, User not valid", async () => {
    const mockUserModel = {
      findById: (_id) =>
        Promise.reject({
          path: "_id",
        }),
    };
    const mockPublicationModel = {};
    let nextFn;
    const next = (err) => (nextFn = err);
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/publication",
      params: {
        idUser: mockIdUser,
      },
    });

    const res = httpMocks.createResponse();

    await getAllPublication(mockPublicationModel, mockUserModel)(
      req,
      res,
      next
    );
    const {
      status,
      error: { id },
    } = nextFn;
    expect(status).toBe(400);
    expect(id).toBe("1");
  });
});

describe("Find publications by Publication Id", () => {
  const mockIdPub = "12313235";
  const mockPub = mockPublication(mockIdPub);
  const req = httpMocks.createRequest({
    method: "GET",
    url: "/api/publication/detail",
    params: {
      idPublication: mockIdPub,
    },
  });
  const res = httpMocks.createResponse();
  let nextFn;
  const next = (err) => (nextFn = err);

  it("work correctly", async () => {
    const mockPublicationModel = {
      findById: (_id) => Promise.resolve(mockPub),
    };
    await findPublication(mockPublicationModel)(req, res, next);
    const result = res._getJSONData();
    expect(result.description).toBe(mockPub.description);
  });

  it("work incorrectly, Publication Id not valid", async () => {
    const mockPublicationModel = {
      findById: (_id) => Promise.reject({ path: "_id" }),
    };
    await findPublication(mockPublicationModel)(req, res, next);
    expect(nextFn.error.id).toBe(1);
    expect(nextFn.error.message).toBe("Publication not exists");
  });
});

describe("Find publication by User Id", () => {
  const mockIdUser = "121315asdasd1232";
  const mockPub = Array.from(Array(5), () => mockPublication(mockIdUser));
  const req = httpMocks.createRequest({
    method: "GET",
    url: "/api/publication/detail",
    params: {
      idUser: mockIdUser,
    },
  });
  const res = httpMocks.createResponse();
  let nextFn;
  const next = (err) => (nextFn = err);

  it("work correctly", async () => {
    const mockModel = {
      find: (author) => Promise.resolve(mockPub),
    };
    await findPublicationByUserId(mockModel)(req, res, next);
    const result = res._getJSONData();
    expect(result.length).toBe(5);
    expect(res.statusCode).toBe(200);
  });

  it("work incorrectly, User Id not valid", async () => {
    const mockModel = {
      find: (author) => Promise.reject({ path: "author" }),
    };
    await findPublicationByUserId(mockModel)(req, res, next);
    const { error, status } = nextFn;
    expect(status).toBe(404);
  });
});

describe("Update publication", () => {
  const mockIdPub = "1232451657899";
  const mockPub = mockPublication(mockIdPub);
  const req = httpMocks.createRequest({
    method: "PUT",
    url: "/api/publication",
    params: {
      idPublication: mockIdPub,
    },
    body: {
      ...mockPub,
    },
  });
  const res = httpMocks.createResponse();
  let nextFn;
  const next = (err) => (nextFn = err);

  it("work correctly", async () => {
    const mockModel = {
      updateOne: () => Promise.resolve(),
      findById: (obj) =>
        Promise.resolve({
          populate: ([args]) => ({
            execPopulate: () => Promise.resolve({ _id: obj._id, ...mockPub }),
          }),
        }),
    };
    await updatePublication(mockModel)(req, res, next);
    const result = res._getJSONData();
    expect(result.description).toBe(mockPub.description);
    expect(result.author).toBe(mockPub.author);
  });

  it("work incorrectly, Publication Id not valid", async () => {
    const mockModel = {
      updateOne: (obj) => Promise.reject({ path: "_id" }),
    };
    await updatePublication(mockModel)(req, res, next);
    const { status, error } = nextFn;
    expect(status).toBe(404);
    expect(error.id).toBe(1);
    expect(error.message).toBe("Publication not exists");
  });
});
