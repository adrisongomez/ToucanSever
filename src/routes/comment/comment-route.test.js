const axios = require("axios").default;

const Publication = require("../../models/publication/publication.model");
const User = require("../../models/user/user.model");

const {
  mockUserData,
  mockPublication,
  mockCommentsData,
} = require("../../__mocks__/utils.testHelper");

const {
  dropDatabase,
  connect,
  closeDatabase,
} = require("../../__mocks__/db.testHelper");

const {
  addGenericRoute,
  createTestApp,
} = require("../../__mocks__/app.testHelper");

const route = require("./comment.route");

const app = createTestApp();

app.use("/", route);

addGenericRoute(app);

const endpoint = "http://localhost:7000";

const server = app.listen(7000);

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  server.close();
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

const getPublicationAndUser = async () => {
  const us = mockUserData();
  const user = await User.create(us);
  const pub = mockPublication(user._id);
  const publication = await Publication.create(pub);
  const comment = mockCommentsData(user._id);
  return { user, publication, comment };
};

describe("Comment route works", () => {
  test("addComment POST /idPublication", async () => {
    const { publication, comment } = await getPublicationAndUser();
    const url = `${endpoint}/${publication._id}`;
    const { data, status } = await axios.post(url, comment);
    expect(status).toBe(201);
    expect(data.comments).not.toBe(publication.comments);
  });

  test("deleteComment DELETE /idPublication/idComment", async () => {
    const { publication } = await getPublicationAndUser();
    const comment = publication.comments[0];
    const url = `${endpoint}/${publication._id}/${comment._id}`;
    const { data, status } = await axios.delete(url, comment);
    expect(status).toBe(200);
    expect(data.comments).not.toContain(comment);
  });

  test("updateComment PUT /idPublication/idComment", async () => {
    try {
      const { publication, comment } = await getPublicationAndUser();
      const url = `${endpoint}/${publication._id}/${publication.comments[0]._id}`;
      const { data, status } = await axios.put(url, comment);
      expect(status).toBe(200);
    } catch (error) {
      console.log(error.response.data);
    }
  });
});

describe("Comment route not work", () => {
  test("addComment POST /idPublication, Publication not exists", async () => {
    const url = `${endpoint}/1`;
    try {
      await axios.post(url, {});
    } catch ({ response: { status, data } }) {
      expect(status).toBe(422);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Publication not exists");
    }
  });

  test("addComment POST /idPublication, Author not exists", async () => {
    const { publication, comment } = await getPublicationAndUser();
    comment.author = 1;
    const url = `${endpoint}/${publication._id}`;
    try {
      await axios.post(url, comment);
    } catch ({ response: { status, data } }) {
      expect(status).toBe(422);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Author not valid");
    }
  });

  test("deleteComment DELETE /idPublication/idComment, Comment no exists", async () => {
    const url = `${endpoint}/1/1`;
    try {
      await axios.delete(url);
    } catch ({ response: { data, status } }) {
      expect(status).toBe(404);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Publication not exists");
    }
  });

  test("deleteComment DELETE /idPublication/idComment, Publication not exists", async () => {
    const { publication } = await getPublicationAndUser();
    const url = `${endpoint}/${publication._id}/1`;
    try {
      await axios.delete(url);
    } catch ({ response: { data, status } }) {
      expect(status).toBe(404);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Comment not exists");
    }
  });

  test("updateComment PUT /idPublication/idComment Body: newComment, Publication no exists", async () => {
    const url = `${endpoint}/1/1`;
    try {
      await axios.put(url, {});
    } catch ({ response: { data, status } }) {
      expect(status).toBe(404);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Publication not exists");
    }
  });

  test("updateComment PUT /idPublication/idComment Body: newComment, Comment no exists", async () => {
    const { publication } = await getPublicationAndUser();
    const url = `${endpoint}/${publication._id}/1`;
    try {
      await axios.put(url, {});
    } catch ({ response: { data, status } }) {
      expect(status).toBe(404);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Comment not exists");
    }
  });

  test("updateComment PUT /idPublication/idComment Body: newComment, Differents Author", async () => {
    const { publication, comment } = await getPublicationAndUser();
    const commentToUpdate = publication.comments[0];
    const url = `${endpoint}/${publication._id}/${commentToUpdate._id}`;
    comment.author = 1;
    try {
      await axios.put(url, comment);
    } catch ({ response: { status, data } }) {
      expect(status).toBe(404);
      expect(data.id).toBe(1);
      expect(data.message).toBe("Not allowed, Author differents");
    }
  });
});
