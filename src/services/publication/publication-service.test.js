const {
  createPublicationDoc,
  updatePublicationDoc,
  deletePublicationDoc,
} = require("./publication.service");
const {
  mockUserData,
  mockPublication,
} = require("../../__mocks__/utils.testHelper");

const idAuthorValid = "123456789";
const idPublication = "1112333456";
const publication = mockPublication(idAuthorValid);
const idAuthorNotValid = "1234657897897899879";
const publicationInvalid = mockPublication(idAuthorNotValid);
const newData = mockPublication(idAuthorValid);

describe("User services create", () => {
  test("it work correctly", (done) => {
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
      expect(resp.author).toBe(idAuthorValid);
      expect(resp.description).toBe(publication.description);
      expect(resp.author).toBe(idAuthorValid);
      expect(resp._id).toBe(idPublication);
      done();
    });
  });
  test("it's not working", async () => {
    const mockModel = {
      create: (obj) => {
        return Promise.reject({ author: { message: "Author is not valid" } });
      },
    };
    try {
      await createPublicationDoc(publicationInvalid, mockModel);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("Publication update", () => {
  test("it Work correctly", async () => {
    const mockModel = {
      updateOne: ({ _id }) =>
        Promise.resolve({
          populate: ([args]) => ({
            execPopulate: () => ({ _id, ...newData }),
          }),
        }),
    };
    const data = await updatePublicationDoc(idAuthorValid, newData, mockModel);
    expect(data.author).toBe(newData.author);
    expect(data._id).toBe(idAuthorValid);
  });

  test("it's not working", async () => {
    const mockModel = {
      updateOne: ({ _id }) => Promise.reject({ error: "Reject" }),
    };
    try {
      await updatePublicationDoc(idAuthorNotValid, newData, mockModel);
    } catch (err) {
      expect(err.error).toBe("Reject");
    }
  });
});

describe("Publication delete", () => {
  test("it work correctly", async () => {
    const mockModel = {
      deleteOne: (args) => Promise.resolve(),
    };
    const { message } = await deletePublicationDoc(idAuthorValid, mockModel);
    expect(message).toBe("Publication deleted successfully");
  });
  test("it doesn't work correctly", async () => {
    const mockModel = {
      deleteOne: (args) => Promise.reject(),
    }
    try{
      await deletePublicationDoc(idAuthorNotValid, mockModel);
    }catch(err){
      expect(err.status).toBe(404)
      expect(err.id).toBe(1)
    }
  });
});
