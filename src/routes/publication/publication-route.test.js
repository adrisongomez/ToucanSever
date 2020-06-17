const axios = require("axios").default;

const route = require("./publication.route");

const {
  mockPublication,
  mockUserData,
  mockCommentsData,
} = require("../../__mocks__/utils.testHelper");

const {
  createTestApp,
  addGenericRoute,
} = require("../../__mocks__/app.testHelper");

const {
  closeDatabase,
  connect,
  dropDatabase,
} = require("../../__mocks__/db.testHelper");

const User = require("../../models/user/user.model");
const Publication = require("../../models/publication/publication.model");

const app = createTestApp();

const endpoint = "http://localhost:3000";

app.use("/", route);

addGenericRoute(app);

const server = app.listen(3000);

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

describe("Publication routes work", () => {
  const user = mockUserData();

  const getPubAndUserDB = async () => {
    const userDB = await User.create(user);
    const publication = mockPublication(userDB._id);
    const publicationDB = await Publication.create(publication);
    return { user: userDB, publication: publicationDB };
  };

  test("Create a publication", async () => {
    const userDB = await User.create(user);
    const publication = mockPublication(userDB._id);
    const { status, data } = await axios.post(endpoint, publication);
    expect(status).toBe(201);
    expect(data.description).toBe(publication.description);
    expect(data.author.firstName).toBe(user.firstName);
    expect(data.author.lastName).toBe(user.lastName);
  });

  test("Add comment to a Publication", async () => {
    const userDB = await User.create(user);
    const publication = mockPublication(userDB._id);
    const publicationDB = await Publication.create(publication);
    const url = `${endpoint}/comment/${publicationDB._id}`;
    const comment = mockCommentsData(publicationDB._id);
    const { status, data } = await axios.post(url, comment);
    expect(status).toBe(201);
    expect(data.comments.length).toBe(publication.comments.length + 1);
  });

  test("Delete a Publication", async () => {
    const { publication } = await getPubAndUserDB();
    const url = `${endpoint}/${publication._id}`;
    const { data, status } = await axios.delete(url);
    expect(status).toBe(200);
    expect(data.id).toBe(0);
  });

  test("Get all publication for landing page", async () => {
    const { user, publication } = await getPubAndUserDB();
    const url = `${endpoint}/land/${user._id}`;
    const { data, status } = await axios.get(url);
    expect(status).toBe(200);
    expect(data[0].description).toContain(publication.description);
  });

  test("find a publication", async () => {
    const { publication } = await getPubAndUserDB();
    const url = `${endpoint}/${publication._id}`;
    const { status, data } = await axios.get(url);
    expect(status).toBe(200);
    expect(data.description).toBe(publication.description);
  })

  test("find a publication by user id", async () => {
    const { publication, user } = await getPubAndUserDB();
    const url = `${endpoint}/user/${user._id}`;
    const { status, data } = await axios.get(url);
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(publication.description).toBe(data[0].description);
  });
  test("Update publication by Publication Id", async () => {
    const { publication } = await getPubAndUserDB();
    publication.description = "123456";
    const url = `${endpoint}/${publication._id}`;
    const { status, data } = await axios.put(url, publication);
    expect(status).toBe(200);
    expect(data.description).toBe(publication.description);
  });
});
