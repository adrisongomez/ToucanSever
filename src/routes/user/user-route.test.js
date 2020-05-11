const faker = require("faker");
const axios = require("axios").default;
const endpoint = "http://localhost:8000";

const { createTestApp } = require("../../testHelpers/app.testHelper");
const {
  connect,
  closeDatabase,
  dropDatabase,
} = require("../../testHelpers/db.testHelper");
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
const server = app.listen(8000);

beforeAll(async () => {
  await connect();
  app.use("/", UserRoute);
});

afterEach(async () => await dropDatabase());

afterAll(async () => {
  await closeDatabase();
  server.close();
});

describe("User helper test", () => {
  it("Should say TEST", (done) => {
    return axios.get(`${endpoint}/test`).then((resp) => {
      expect(resp.data).toBe("TEST");
      done();
    });
  });

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
    const allUser = await axios
      .get(`${endpoint}/${user1._id}`)
      .then((resp) => resp.data);
    expect(allUser._id).toBe(user1._id);
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
