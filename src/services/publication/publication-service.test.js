const { createPublicationDoc } = require("./publication.service");
const {
  mockUserData,
  mockPublication,
} = require("../../testHelpers/utils.testHelper");

describe("User services create", () => {
  const idAuthor = "123456789";
  const idPublication = "1112333456";
  const publication = mockPublication(idAuthor);
  test("work correctly", (done) => {
    const mockModel = {
      create: jest.fn((obj) =>
        Promise.resolve({
          populate: (arg, arg2) => ({
            execPopulate: () => Promise.resolve({ _id: idPublication, ...obj }),
          }),
        })
      ),
    };
    createPublicationDoc(publication, mockModel).then((resp) => {
      expect(resp.author).toBe(idAuthor);
      expect(resp.description).toBe(publication.description);
      expect(resp.author).toBe(idAuthor);
      expect(resp._id).toBe(idPublication);
      done();
    });
  });
});
