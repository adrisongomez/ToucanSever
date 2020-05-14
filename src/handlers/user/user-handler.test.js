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

  test("Find a user by id", () => {
    const user = mockUserData();
    const mockModel = {
      findById: jest.fn((id) => Promise.resolve({ _id: id, ...user })),
    };
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/user/123456789",
      params: {
        id: 123456789,
      },
    });
    const response = httpMocks.createResponse();

    findUserById(mockModel)(request, response);
    expect(mockModel.findById).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  });

  test("Find all user", () => {
    const listUser = Array.from(Array(5), () => mockUserData());
    const mockModel = {
      find: jest.fn(() => Promise.resolve(listUser)),
    };
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/user/",
    });
    const res = httpMocks.createResponse();
    findUsers(mockModel)(req, res);
    expect(res.statusCode).toBe(200);
  });

  test("Find all user with pagination option", () => {
    const listUser = Array.from(Array(5), () => mockUserData());
    const mockModel = {
      find: () => ({
        limit: (limit) => ({
          skip: jest.fn(() => Promise.resolve(listUser)),
        }),
      }),
    };
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/user/?page=1&limit=5",
      query: {
        page: 1,
        limit: 5,
      },
    });
    const res = httpMocks.createResponse();
    findUsers(mockModel)(req, res);
    expect(res.statusCode).toBe(200);
  });

  test("Delete user by Id", () => {
    const mockModel = {
      deleteOne: (obj) => Promise.resolve(),
    };
    const request = httpMocks.createRequest({
      method: "DELETE",
      url: "/api/user/123456789",
      params: {
        id: 123456789,
      },
    });
    const response = httpMocks.createResponse();
    deleteUser(mockModel)(request, response);
    expect(response.statusCode).toBe(200);
  });

  test("Update user", () => {
    const mockModel = {
      updateOne: ({ _id }, data) => Promise.resolve({ _id, ...data }),
    };
    const user = mockUserData();
    const request = httpMocks.createRequest({
      method: "PUT",
      url: "/api/user/123456789",
      params: {
        id: 123456789,
      },
    });
    const response = httpMocks.createResponse();
    updateUser(mockModel)(request, response);
    expect(response.statusCode).toBe(200);
  });
});
