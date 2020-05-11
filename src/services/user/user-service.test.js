const faker = require("faker");

const {
  createUserDoc,
  findUserDocById,
  findAllUserDocs,
  findUserDocsPagination,
  updateUserDoc,
  deleteUserDoc,
} = require("./user.service");

const mockModel = {
  create: (obj) => Promise.resolve(obj),
  findById: (id) => Promise.resolve({ _id: id }),
  find: () => Promise.resolve(Array.from(Array(5), () => ({ id: "1" }))),
  deleteOne: (obj) => Promise.resolve({ id: 0, message: "User deleted" }),
  updateOne: (objId, objChange) =>
    Promise.resolve({ n: 1, nModified: 1, ok: 1 }),
};

const mockModelPagination = {
  find: () => ({
    limit: (limit) => ({
      skip: () => Promise.resolve(Array.from(Array(5), () => ({}))),
    }),
  }),
};

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

describe("User services work", () => {
  it("Should create an User", () => {
    const user = mockUserData();
    const userCreate = createUserDoc(user, mockModel);
    return userCreate.then((resp) => {
      expect(resp.name).toBe(user.name);
    });
  });
  it("Should find a User by id", () => {
    const idUser = "1312a4sd54613d5a4ads60";
    return findUserDocById(idUser, mockModel).then((resp) =>
      expect(resp._id).toBe(idUser)
    );
  });
  it("Should get a list of user", () => {
    return findAllUserDocs(mockModel).then((resp) => {
      expect(resp.length).toBe(5);
      expect(resp[1]).toBeDefined();
    });
  });
  it("Should get a list of user using pagination options", () => {
    return findUserDocsPagination(
      { page: 0, limit: 5 },
      mockModelPagination
    ).then((resp) => {
      expect(resp.results.length).toEqual(5);
      expect(resp.results[1]).toBeDefined();
    });
  });
  it("Should update User data", () => {
    const mockUser = mockUserData();
    mockUser.firstName = "John";
    mockUser.lastName = "Smith";
    const mockUserId = "12365asdasdas";
    return updateUserDoc(mockUserId, mockUser, mockModel).then((resp) => {
      expect(resp.data._id).toEqual(mockUserId);
      expect(resp.data.firstName).toEqual("John");
      expect(resp.data.lastName).toEqual("Smith");
    });
  });
  it("Should delete a User passing id user", () => {
    const mockIdUser = "asdasdasdasqweq123";
    return deleteUserDoc(mockIdUser, mockModel).then((resp) => {
      expect(resp.message).toEqual("User deleted");
    });
  });
});

