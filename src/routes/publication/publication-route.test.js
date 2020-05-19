const axios = require("axios").default;
const route = require("./publication.route");
const {
  mockPublication,
  mockUserData,
} = require("../../testHelpers/utils.testHelper");
const { createTestApp } = require("../../testHelpers/app.testHelper");
const {
  closeDatabase,
  connect,
  dropDatabase,
} = require("../../testHelpers/db.testHelper");
const User = require("../../models/user/user.model");

const app = createTestApp();
const endpoint = "http://localhost:8000";

app.use("/", route);
const server = app.listen(8000);

const user = mockUserData();

beforeAll(async () => {
  await connect();
  await dropDatabase();
});

afterAll(async () => {
  server.close();
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

describe("Publication routes work correctly", () => {
  test("Create a publication", (done) => {
    let publication;
    User.create(user)
      .then((user) => {
        publication = mockPublication(user._id);
        return axios.post(endpoint, publication);
      })
      .then(({ status, data }) => {
        expect(status).toBe(201);
        expect(data.description).toBe(publication.description);
        expect(data.author._id == publication.author).toBe(true);
        expect(data.author.firstName).toBe(user.firstName);
        expect(data.author.lastName).toBe(user.lastName);
        done();
      });
  });
});
