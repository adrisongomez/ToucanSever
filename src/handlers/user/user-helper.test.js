const faker = require("faker");
const axios = require("axios").default;
const endpoint = "http://localhost:8000";

const { createTestApp } = require("../../testHelpers/app.testHelper");
const {
  connect,
  closeDatabase,
  dropDatabase,
} = require("../../testHelpers/db.testHelper");
const UserRoute = require("../../routes/user.route");

const app = createTestApp();
let server;

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

describe("User helper test", () => {
  beforeAll(async () => {
    server = app.listen(8000);
    await connect();
    app.use("/", UserRoute);
  });

  afterAll(async () => {
    await closeDatabase();
    server.close();
  });

  afterEach(async () => await dropDatabase());

  it("Should say TEST", () => {
    return axios
      .get(`${endpoint}/test`)
      .then((resp) => expect(resp.data).toBe("TEST"));
  });

  test("Create a user", () => {
    const mockUser = mockUserData();
    return axios.post(endpoint, mockUser).then((resp) => {
      const data = resp.data.user;
      expect(resp.status).toBe(201);
      expect(data.firstName).toBe(mockUser.firstName);
      expect(data.lastName).toBe(mockUser.lastName);
      expect(data.email).toBe(mockUser.email);
      expect(data.createdAt).toBeDefined();
    });
  });

  test("Find a user id", async () => {
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
  });
  test("Get a user list without sending pagination details", () => {
    const listMockUser = Array.from(Array(5), () => mockUserData());
    const sendAllUser = (mockUser) =>
      axios.post(endpoint, mockUser).then((response) => response.data.user);
    return Promise.all(listMockUser.map(sendAllUser))
      .then(() => axios.get(endpoint))
      .then((resp) => {
        const data = resp.data;
        expect(resp.status).toBe(200);
        expect(data.length).toBe(5);
      });
  });

  test("Get a user list with sending pagination opcions", () => {
    const listMockUser = Array.from(Array(50), () => mockUserData());
    const sendAllUser = (mockUser) =>
      axios.post(endpoint, mockUser).then((response) => response.data.user);
    return Promise.all(listMockUser.map(sendAllUser))
      .then(() => axios.get(`${endpoint}/?page=4&limit=10`))
      .then((resp) => {
        const data = resp.data;
        expect(resp.status).toBe(200);
        expect(data.page).toBe(4);
        expect(data.results.length).toBe(10);
      });
  });

  test("Update a user data", () => {
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
      })
      .catch((err) => console.log(err));
  });
});
