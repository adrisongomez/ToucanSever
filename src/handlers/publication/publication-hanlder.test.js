const httpMocks = require("node-mocks-http");
const {
  createPublication,
  deletePublications,
} = require("./publication.handler");
const { mockPublication } = require("../../__mocks__/utils.testHelper");

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

    await createPublication(mockPublicationModel)(req, res, (obj) => {});
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

    await deletePublications(mockModel)(req, res, (obj) => {});
    const result = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(result.id).toBe(1);
    expect(result.message).toBe("Publication not exists");
  });
});
