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

const endpoint = "http://localhost:7700";

app.use("/", route);

addGenericRoute(app);

const server = app.listen(7700);

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

const getPubAndUserDB = async () => {
  const user = mockUserData();
  const userDB = await User.create(user);
  const publication = mockPublication(userDB._id);
  const publicationDB = await Publication.create(publication);
  return { user: userDB, publication: publicationDB };
};

describe("Publication routes happy path", () => {
  test("Create a publication", async () => {
    const { publication, user } = await getPubAndUserDB();
    const { status, data } = await axios.post(endpoint, publication);
    expect(status).toBe(201);
    expect(data.description).toBe(publication.description);
    expect(data.author.firstName).toBe(user.firstName);
    expect(data.author.lastName).toBe(user.lastName);
  });

  test("Create a publication with resource", async () => {
    const { publication, user } = await getPubAndUserDB();
    const obj = await publication.toObject();
    obj.album = user.albums[0];
    const { status, data } = await axios.post(endpoint, obj);
    expect(status).toBe(201);
    expect(data.description).toBe(publication.description);
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
  });

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

describe("Publication route bad path", () => {
  const idPubNotExists = "1";
  const idUserNotExists = "1";

  test("Create a publication", async () => {
    const url = `${endpoint}`;
    try {
      await axios.post(url, {});
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(400);
      expect(data.errors.author).toBeDefined();
      expect(data.errors.description).toBeDefined();
    }
  });

  test("Create a publication with author id that doesn't exists", async () => {
    const url = `${endpoint}`;
    try {
      await axios.post(url, mockPublication(idUserNotExists));
    } catch (error) {
      const {
        status,
        data: { errors },
      } = error.response;
      expect(status).toBe(400);
      expect(errors.author).toBeDefined();
    }
  });

  test("Delete a publication that doesn't exists", async () => {
    const url = `${endpoint}/${idPubNotExists}`;
    try {
      await axios.delete(url);
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(404);
      expect(data.id).toBe(1);
    }
  });

  test("Get all publication for landing page by idUser", async () => {
    const url = `${endpoint}/land/${idUserNotExists}`;
    try {
      await axios.get(url);
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(400);
      expect(data.id).toBe("1");
    }
  });

  test("Find publication by Publication Id", async () => {
    try {
      const url = `${endpoint}/${idPubNotExists}`;
      await axios.get(url);
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(400);
      expect(data.id).toBe(1);
    }
  });

  test("Find publications by User Id", async () => {
    const url = `${endpoint}/user/${idUserNotExists}`;
    try {
      await axios.get(url);
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(404);
      expect(data.id).toBe(1);
    }
  });

  test("Find publication by Publication Id", async () => {
    const url = `${endpoint}/${idPubNotExists}`;
    try {
      await axios.get(url);
    } catch (error) {
      const { status, data } = error.response;
      expect(status).toBe(400);
      expect(data.id).toBe(1);
    }
  });
});

test("Comments Route integrate well, POST addComment", async () => {
  const { publication, user } = await getPubAndUserDB();
  const comment = await mockCommentsData(user._id);
  const url = `${endpoint}/comment/${publication._id}`;
  const { data, status } = await axios.post(url, comment);
  expect(status).toBe(201);
  expect(data.comments).not.toBe(publication.comments);
});

test("Comment Route integrate well (bad path), POST addComment, Publication not exists", async () => {
  const url = `${endpoint}/comment/1`;
  try {
    await axios.post(url, {});
  } catch ({ response: { data, status } }) {
    expect(status).toBe(422);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Publication not exists");
  }
});
