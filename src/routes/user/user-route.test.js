const faker = require("faker");
const axios = require("axios").default;
const endpoint = "http://localhost:8000";

const {
  createTestApp,
  addGenericRoute,
} = require("../../__mocks__/app.testHelper");
const {
  connect,
  closeDatabase,
  dropDatabase,
} = require("../../__mocks__/db.testHelper");
const UserRoute = require("./user.route");

const app = createTestApp();

const mockUserData = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.exampleEmail(),
  country: faker.address.country(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  address: faker.address.streetAddress(),
});
app.use("/", UserRoute);
addGenericRoute(app);
const server = app.listen(8000);

beforeAll(async () => {
  await connect();
});

afterEach(async () => await dropDatabase());

afterAll(async () => {
  await closeDatabase();
  server.close();
});

describe("User routes are using correctly", () => {
  test("Create a user", (done) => {
    const mockUser = mockUserData();
    return axios.post(endpoint, mockUser).then((resp) => {
      const data = resp.data.user;
      expect(resp.status).toBe(201);
      expect(data.firstName).toBe(mockUser.firstName);
      expect(data.lastName).toBe(mockUser.lastName);
      expect(data.email).toBe(mockUser.email);
      expect(data.createdAt).toBeDefined();
      done();
    });
  });

  test("Find a user id", async (done) => {
    const mockUser1 = mockUserData();
    const mockUser2 = mockUserData();
    const user1 = await axios
      .post(endpoint, mockUser1)
      .then((resp) => resp.data.user);
    const user2 = await axios
      .post(endpoint, mockUser2)
      .then((resp) => resp.data.user);
    const response = await axios
      .get(`${endpoint}/${user1._id}`)
      .then((resp) => resp.data);
    expect(response._id).toBe(user1._id);
    done();
  });

  test("Get a user list without sending pagination details", (done) => {
    const listMockUser = Array.from(Array(5), () => mockUserData());
    const sendAllUser = (mockUser) =>
      axios.post(endpoint, mockUser).then((response) => response.data.user);
    return Promise.all(listMockUser.map(sendAllUser))
      .then(() => axios.get(endpoint))
      .then((resp) => {
        const data = resp.data;
        expect(resp.status).toBe(200);
        expect(data.length).toBe(5);
        done();
      });
  });

  test("Get a user list with sending pagination opcions", (done) => {
    const listMockUser = Array.from(Array(50), (done) => mockUserData());
    const sendAllUser = (mockUser) =>
      axios.post(endpoint, mockUser).then((response) => response.data.user);
    return Promise.all(listMockUser.map(sendAllUser))
      .then(() => axios.get(`${endpoint}/?page=4&limit=10`))
      .then((resp) => {
        const data = resp.data;
        expect(resp.status).toBe(200);
        expect(data.page).toBe(4);
        expect(data.results.length).toBe(10);
        done();
      });
  });

  test("Update a user data", (done) => {
    const mockUser = mockUserData();
    let idCreated;
    return axios
      .post(endpoint, mockUser)
      .then((resp) => {
        const userCreated = resp.data.user;
        idCreated = userCreated._id;
        userCreated.firstName = "John";
        userCreated.lastName = "Oregon";
        return axios.put(`${endpoint}/${idCreated}`, userCreated);
      })
      .then((resp) => {
        const userUpdate = resp.data.data;
        expect(userUpdate._id).toBe(idCreated);
        expect(userUpdate.firstName).toBe("John");
        expect(userUpdate.lastName).toBe("Oregon");
        done();
      });
  });
  test("Delete a user by Id User", (done) => {
    const mockUser = mockUserData();
    return axios
      .post(endpoint, mockUser)
      .then((resp) => {
        const idUser = resp.data.user._id;
        return axios.delete(`${endpoint}/${idUser}`);
      })
      .then((resp) => {
        expect(resp.status).toBe(200);
        expect(resp.data.message).toBe("User deleted");
        done();
      });
  });
});

describe("Users routes are using incorrectly", () => {
  test("Create a user", (done) => {
    const mockUser = mockUserData();
    mockUser.firstName = undefined;
    mockUser.lastName = undefined;
    return axios.post(endpoint, mockUser).catch((error) => {
      expect(error.response.status).toBe(422);
      done();
    });
  });

  test("Create a two user with the same email address", (done) => {
    const mockUser1 = mockUserData();
    const mockUser2 = mockUserData();
    mockUser1.email = mockUser2.email;
    return axios
      .post(endpoint, mockUser1)
      .then(() => axios.post(endpoint, mockUser2))
      .catch(({ response }) => {
        expect(response.status).toBe(422);
        done();
      });
  });

  test("Create a user with the email not valid", (done) => {
    const mockUser1 = mockUserData();
    mockUser1.email = "this is a not valid email";
    return axios
      .post(endpoint, mockUser1)
      .then((resp) => {
        console.log(resp.data);
        done();
      })
      .catch(({ response }) => {
        expect(response.status).toBe(422);
        done();
      });
  });

  test("Find a user that doesn't exit", (done) => {
    return axios.get(`${endpoint}/123456789`).catch((err) => {
      expect(err.response.status).toBe(404);
      done();
    });
  });
});
