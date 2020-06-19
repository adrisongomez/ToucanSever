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
