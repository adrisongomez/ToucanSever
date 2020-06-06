const httpMocks = require("node-mocks-http");
const { createPublication } = require("./publication.handler");
const { mockPublication } = require("../../__mocks__/utils.testHelper");

describe("Publication handler work correctly", () => {
  test("Create publication", async () => {
    const publication = mockPublication("112223344455");
    const req = httpMocks.createRequest({
      method: "POST",
      url: "api/publication/",
      body: {
        ...publication,
      },
    });
    const mockModel = {
      create: () =>
        Promise.resolve({
          populate: (a, b) => ({
            execPopulate: () => {
              return { _id: 1231456126, ...publication };
            },
          }),
        }),
    };
    const res = httpMocks.createResponse();
    await createPublication(mockModel)(req, res, () => {});
    expect(res.statusCode).toBe(201);
  });
});
