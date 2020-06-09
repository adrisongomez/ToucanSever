const axios = require("axios").default;
const route = require("./publication.route");
const {
  mockPublication,
  mockUserData,
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

const app = createTestApp();
const endpoint = "http://localhost:8000/";

app.use("/", route);
addGenericRoute(app);

const userData = mockUserData();

beforeAll(async () => {
  await app.listen(8000);
  await connect();
  await dropDatabase();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

describe("Publication routes work", () => {
  test.skip("Create a publication", async () => {
    try {
      const user = await User.create(mockUserData);
      const publication = mockPublication(user._id);
      const response = await axios.post(endpoint, publication);
      const data = response.data;
      console.log(response);
      expect(status).toBe(201);
      expect(data.description).toBe(publication.description);
      expect(data.author._id == publication.author).toBe(true);
      expect(data.author.firstName).toBe(user.firstName);
      expect(data.author.lastName).toBe(user.lastName);
      done();
    } catch (err) {
      console.log(err);
    }
  });

  test.skip("Create a publication with id User or author that doesn't exits", async () => {
    try {
      const idUserNotExit = "1234567894156";
      const publication = mockPublication(idUserNotExit);
      await axios.post(endpoint, publication);
    } catch (err) {
      console.log(err.response.data);
      const data = err.response.data.error.errors;
      expect(data.author).toBeDefined();
    }
  });
});
