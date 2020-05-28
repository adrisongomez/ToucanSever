const { createPublicationDoc } = require("./publication.service");
const {
  mockUserData,
  mockPublication,
} = require("../../__mocks__/utils.testHelper");

describe("User services create", () => {
  const idAuthor = "123456789";
  const idPublication = "1112333456";
  const publication = mockPublication(idAuthor);
  test.skip("work correctly", (done) => {
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
  test.skip("is not working", (done) => {
    const idAuthorNotValid = "1234657897897899879";
    const publication = mockPublication(idAuthorNotValid);
    const mockModel = {
      create: (obj) => {
        console.log("from Mock")
        return Promise.reject({ author: { message: "Author is not valid" } });
      },
    };
    expect(createPublicationDoc(publication, mockModel)).rejects.toThrow();
    done();
  });
});
