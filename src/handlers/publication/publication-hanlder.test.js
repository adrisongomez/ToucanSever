const httpMocks = require("node-mocks-http");
const { createPublication } = require("./publication.handler");
const { mockPublication } = require("../../__mocks__/utils.testHelper");

describe("Publication handler work correctly", async () => {
  test("Create publication", async () => {
    const mockModel = {
      create: (obj) =>
        Promise.resolve({
          populate: (arg, arg2) => ({
            execPopulate: () => ({ _id: "123456789", ...obj }),
          }),
        }),
    };
    const publication = mockPublication("112223344455");
    const req = httpMocks.createRequest({
      method: "POST",
      url: "api/publication/",
      body: {
        ...publication,
      },
    });
    const res = httpMocks.createResponse();
    createPublication(mockModel)(req, res, () => {});
    expect(res.statusCode).toBe(201);
  });
});
