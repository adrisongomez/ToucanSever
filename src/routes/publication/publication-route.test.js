const axios = require("axios").default;
const route = require("./publication.route");
const {
  mockPublication,
  mockUserData,
} = require("../../__mocks__/utils.testHelper");
const { createTestApp } = require("../../__mocks__/app.testHelper");
const {
  closeDatabase,
  connect,
  dropDatabase,
} = require("../../__mocks__/db.testHelper");
const User = require("../../models/user/user.model");

const app = createTestApp();
const endpoint = "http://localhost:8000";

app.use("/", route);
const server = app.listen(8000);

const user = mockUserData();

beforeAll(async () => {
  await connect();
  await dropDatabase();
  await server.close();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

describe("Publication routes work", () => {
  test.skip("Create a publication", (done) => {
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

  test("Create a publication with id User or author that doesn't exits", (done) => {
    const idUserNotExit = "1234567894156";
    const publication = mockPublication(idUserNotExit);
    axios
      .post(endpoint, publication)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response.data);
        expect(err.author).toBe("Author not valid");
        expect(err.status).toBe(400);
        done();
      });
  });
});
