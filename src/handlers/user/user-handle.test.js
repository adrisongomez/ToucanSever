const httpMocks = require("node-mocks-http");
const {
  createUser,
  deleteUser,
  findUserById,
  findUsers,
  updateUser,
} = require("./user.handler");
const faker = require("faker");

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

describe("User handlers are working correctly", () => {
  test("Create a user", () => {
    const mockModel = {
      create: jest.fn((obj) => Promise.resolve({ _id: 123456789, ...obj })),
    };
    const request = httpMocks.createRequest({
      method: "GET",
      body: mockUserData(),
      url: "/api/user",
    });
    const response = httpMocks.createResponse();
    createUser(mockModel)(request, response);
    expect(mockModel.create).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  });
});
