const Publication = require("../publication.model");
const User = require("../../user/user.model");

const {
  connect,
  closeDatabase,
  dropDatabase,
} = require("../../../__mocks__/db.testHelper");

const {
  mockCommentsData,
  mockPublication,
  mockUserData,
} = require("../../../__mocks__/utils.testHelper");

const getUserAndPub = async () => {
  const user = await User.create(mockUserData());
  const publication = await Publication.create(mockPublication(user._id));
  const comment = mockCommentsData(user._id);
  return { user, publication, comment };
};

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await dropDatabase();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

describe("Comment Model Works", () => {
  test("Create a comments", async () => {
    const { publication, comment } = await getUserAndPub();
    const newComment = await publication.comments.create(comment);
    expect(newComment._id).toBeDefined();
    expect(newComment.comment).toBe(comment.comment);
    expect(newComment.author).toStrictEqual(comment.author);
  });

  test("Delete a comment", async () => {
    const { publication } = await getUserAndPub();
    const result = publication.comments.id(publication.comments[0]).remove();
    await publication.save();
    expect(publication.comments).not.toContain(result);
  });

  test("Update a comment", async () => {
    const { publication, comment } = await getUserAndPub();
    const commentToUpdate = publication.comments
      .id(publication.comments[0])
      .remove();
    commentToUpdate.comment = comment.comment;
    publication.comments.push(commentToUpdate);
    await publication.save();
    const commentUpdated = publication.comments.id(commentToUpdate._id);
    expect(commentUpdated._id).toStrictEqual(commentToUpdate._id);
    expect(commentUpdated.comment).toBe(commentToUpdate.comment);
    expect(commentUpdated.author).toBe(commentToUpdate.author);
  });
});

describe("Comment Model not works", () => {
  test("Create Comment with not valid user", async () => {
    const { publication } = await getUserAndPub();
    const model = publication.comments;
    try {
      await model.create({ comment: "user", author: "15122" });
    } catch (error) {
      expect(error.path).toBe("author");
    }
  });
  
});
