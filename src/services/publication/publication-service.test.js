const {
  createPublicationDoc,
  updatePublicationDoc,
  deletePublicationDoc,
  getAllPublicationDoc: findPublicationDoc,
  addCommentsToPublicationsDoc,
  findByIdPublicationDoc,
  findByIdPublicationDocByUserId,
} = require("./publication.service");
const {
  mockUserData,
  mockCommentsData,
  mockPublication: mockPublicationData,
} = require("../../__mocks__/utils.testHelper");

const idAuthorValid = "123456789";
const idPublication = "1112333456";
const publication = mockPublicationData(idAuthorValid);
const idAuthorNotValid = "1234657897897899879";
const publicationInvalid = mockPublicationData(idAuthorNotValid);
const newData = mockPublicationData(idAuthorValid);

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

    try {
      await createPublicationDoc({}, mockPublicationModel);
    } catch ({ errors: err }) {
      expect(err.author).toBe(authorMsj);
      expect(err.description).toBe(descriptionMsj);
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
      expect(err.id).toBe(1);
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
    };
    try {
      await deletePublicationDoc(idAuthorNotValid, mockModel);
    } catch (err) {
      expect(err.id).toBe(1);
    }
  });
});

describe("Finds Publications by Followings and Followers ids", () => {
  const userId = "12341234124618264183";
  const followingUserId = "1231wdasdasdfasdfasd";
  const follwerUserId = "1231wdasdasdfasdfaks";
  const mockUser = mockUserData();
  const publicationsList = Array.from(Array(5), () =>
    mockPublicationData(followingUserId)
  );

  it("works correctly", async () => {
    //3 Id which are going to be query
    mockUser.followings = [followingUserId];
    mockUser.followers = [follwerUserId];
    mockUser._id = userId;

    const mockUserModel = {
      findById: () => Promise.resolve(mockUser),
    };

    const mockPublicationModel = {
      find: (obj) => Promise.resolve(publicationsList),
    };

    const result = await findPublicationDoc(
      userId,
      mockPublicationModel,
      mockUserModel
    );

    /*Multiply by 3 cause everytime that findById is executed it's gonna return the same amunts
    of Publications, so we send 3 IDs it would be return 3 * publicationsList.
    */
    expect(publicationsList.length * 3).toBe(result.length);
  });

  it("work incorrectly, Followings or Followers not valid", async () => {
    const mockUserModel = {
      findById: () => Promise.resolve(mockUser),
    };

    const mockPublicationModel = {
      find: (obj) => Promise.reject({ path: "followings" }),
    };
    try {
      await findPublicationDoc(userId, mockPublicationModel, mockUserModel);
    } catch (err) {
      expect(err.id).toBe("1");
      expect(err.message).toBe("Followings or Followers are not valids");
    }
    const mockPublicationModel2 = {
      find: (obj) => Promise.reject({ path: "followers" }),
    };
    try {
      await findPublicationDoc(userId, mockPublicationModel2, mockUserModel);
    } catch (err) {
      expect(err.id).toBe("1");
      expect(err.message).toBe("Followings or Followers are not valids");
    }
  });

  it("work incorrectly, User not valid", async () => {
    const mockUserModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    const mockPublicationModel = {};
    try {
      await findPublicationDoc(userId, mockPublicationModel, mockUserModel);
    } catch (err) {
      expect(err.id).toBe("1");
      expect(err.message).toBe("User not valid");
    }
  });
});

describe("Add comments to Publications", () => {
  const mockIdUser = "1235asdfasd";
  const mockUser = mockUserData();
  const mockPub = mockPublicationData(mockIdUser);
  const mockIdPub = "1213216546561237";
  const comment = mockCommentsData(mockIdUser);

  it("work correctly", async () => {
    const mockPublicationModel = {
      findById: (_id) => Promise.resolve({ _id, ...mockPub }),
      updateOne: (id, obj) => Promise.resolve({ _id: id._id, ...obj }),
    };
    const result = await addCommentsToPublicationsDoc(
      mockIdPub,
      comment,
      mockPublicationModel
    );
    expect(result.comments.length).toBe(mockPub.comments.length);
  });

  it("work incorrectly, Author not valid", async () => {
    const mockPublicationModel = {
      findById: (_id) => Promise.resolve({ _id, ...mockPub }),
      updateOne: (id, obj) =>
        Promise.reject({
          errors: {
            "comments.0.author": {
              message: "Author not valid",
            },
          },
        }),
    };
    try {
      await addCommentsToPublicationsDoc(
        mockIdPub,
        comment,
        mockPublicationModel
      );
    } catch ({ errors }) {
      expect(errors["comments.0.author"]).toBe("Author not valid");
    }
  });
});

describe("Find publication by Publication Id", () => {
  const mockIdPub = "12312132121313213132";
  const mockPub = mockPublicationData();
  it("work correctly", async () => {
    const mockModel = {
      findById: (_id) => Promise.resolve({ _id, ...mockPub }),
    };
    const result = await findByIdPublicationDoc(mockIdPub, mockModel);
    expect(result.description).toBe(mockPub.description);
    expect(result._id).toBe(mockIdPub);
  });

  it("work incorrectly, Publications Id not valid", async () => {
    const mockModel = {
      findById: (_id) => Promise.reject({ path: "_id" }),
    };
    try {
      await findByIdPublicationDoc(mockIdPub, mockModel);
    } catch (err) {
      expect(err.id).toBe(1);
      expect(err.message).toBe("Publication not exists");
    }
  });
});

describe("Find publication by User Id", () => {
  const mockIdUser = "1231541235412";
  const mockPub = Array.from(Array(5), () => mockPublicationData(mockIdUser));

  it("work correctly", async () => {
    const mockModel = {
      find: (obj) => Promise.resolve(mockPub),
    };
    const result = await findByIdPublicationDocByUserId(mockIdUser, mockModel);
    expect(result.length).toBe(5);
  });

  it("work incorrectly, User Id not valid", async () => {
    const mockModel = {
      find: (obj) => Promise.reject({ path: "author" }),
    };
    try{
      await findByIdPublicationDocByUserId(mockIdUser, mockModel);
    }catch(error){
      expect(error.id).toBe(1);
      expect(error.message).toBe("User Id not exists")
    }
  });
});
