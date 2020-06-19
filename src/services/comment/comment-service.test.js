const {
  addComment,
  deleteComment,
  updateComment,
} = require("./comment.service");
const {
  mockPublication,
  mockCommentsData,
} = require("../../__mocks__/utils.testHelper");

describe("addComment to a publication", () => {
  const publication = mockPublication(1);
  const comment = mockCommentsData(1);

  it("should work correctly", async () => {
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          _id,
          ...publication,
          comments: {
            create: (obj) => Promise.resolve(publication),
          },
        }),
    };
    const result = await addComment(1, comment, mockModel);
    expect(publication).toBe(result);
  });

  it("should not work correctly, not valid author", async () => {
    const mockModel = {
      findById: (_id) => Promise.reject({ path: "author" }),
    };
    try {
      await addComment(1, comment, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Author not valid");
    }
  });
});

describe("deleteComment from a publication", () => {
  const publication = mockPublication(1);
  const comment = mockCommentsData(1);

  it("should work correctly", async () => {
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          comments: {
            id: (args) => ({
              remove: () => comment,
            }),
          },
          save: () => Promise.resolve(publication),
        }),
    };
    const result = await deleteComment(1, 1, mockModel);
    expect(result).toBe(publication);
  });

  it("should not work correctly, not valid publication valid", async () => {
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    try {
      await deleteComment(1, 1, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Publication not exists");
    }
  });

  it("should not work correctly, not valid comment id", async () => {
    const mockModel = {
      findById: () =>
        Promise.resolve({
          comments: {
            id: (obj) => null,
          },
        }),
    };
    try {
      await deleteComment(1, 1, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Comment not exists");
    }
  });
});

describe("updateComment from a publication", () => {
  const publication = mockPublication(1);
  const comment = mockCommentsData(1);
  it("should work correctly", async () => {
    const mockModel = {
      findById: () =>
        Promise.resolve({
          comments: {
            id: (obj) => ({
              _id: 123,
              ...comment,
            }),
          },
          save: () => {
            publication.comments.push(comment);
            return Promise.resolve(publication);
          },
        }),
    };

    const result = await updateComment(1, 1, comment, mockModel);
    expect(result).toBe(publication);
    expect(result.comments).toContainEqual(comment);
  });

  it("should not work correctly, PubId not valid", async () => {
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    try {
      await updateComment(1, 1, comment, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Publication not exists");
    }
  });

  it("should not work correctly, differents author", async () => {
    const comment2 = mockCommentsData(2);
    comment2.author = 2;
    const mockModel = {
      findById: () =>
        Promise.resolve({
          comments: {
            id: (obj) => comment2,
          },
        }),
    };
    try {
      await updateComment(1, 1, comment, mockModel);
    } catch (error) {
      expect(error.id).toBe(1);
      expect(error.message).toBe("Not allowed, Author differents");
    }
  });
});
