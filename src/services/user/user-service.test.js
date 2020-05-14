const faker = require("faker");

const {
  createUserDoc,
  findUserDocById,
  findAllUserDocs,
  findUserDocsPagination,
  updateUserDoc,
  deleteUserDocById,
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
  it("Should create an User", (done) => {
    const user = mockUserData();
    const userCreate = createUserDoc(user, mockModel);
    return userCreate.then((resp) => {
      expect(resp.name).toBe(user.name);
      done();
    });
  });

  it("Should find a User by id", (done) => {
    const idUser = "1312a4sd54613d5a4ads60";
    return findUserDocById(idUser, mockModel).then((resp) => {
      expect(resp._id).toBe(idUser);
      done();
    });
  });

  it("Should get a list of user", (done) => {
    return findAllUserDocs(mockModel).then((resp) => {
      expect(resp.length).toBe(5);
      expect(resp[1]).toBeDefined();
      done();
    });
  });

  it("Should get a list of user using pagination options", (done) => {
    return findUserDocsPagination(
      { page: 0, limit: 5 },
      mockModelPagination
    ).then((resp) => {
      expect(resp.results.length).toEqual(5);
      expect(resp.results[1]).toBeDefined();
      done();
    });
  });

  it("Should update User data", (done) => {
    const mockUser = mockUserData();
    mockUser.firstName = "John";
    mockUser.lastName = "Smith";
    const mockUserId = "12365asdasdas";
    return updateUserDoc(mockUserId, mockUser, mockModel).then((resp) => {
      expect(resp.data._id).toEqual(mockUserId);
      expect(resp.data.firstName).toEqual("John");
      expect(resp.data.lastName).toEqual("Smith");
      done();
    });
  });

  it("Should delete a User passing id user", () => {
    const mockIdUser = "asdasdasdasqweq123";
    return deleteUserDocById(mockIdUser, mockModel).then((resp) => {
      expect(resp.message).toEqual("User deleted");
    });
  });
});

describe("When user services are not using correctly", () => {
  test("Creating User with some field undefined or not setting", (done) => {
    const error = {
      errors: {
        email: {
          message: "Email must be unique and is required",
          value: undefined,
          reason: undefined,
        },
      },
    };
    const mockModel = {
      create: () => Promise.reject(error),
    };
    const mockUser = mockUserData();
    mockUser.email = undefined;

    createUserDoc(mockUser, mockModel).catch(( err ) => {
      expect(err).toBe(error);
      done();
    });
  });
  test.skip("Find a user with id that not exists", (done) => {
    const mockModel = {
      findById: (id) =>
        Promise.reject({
          message:
            'Cast to ObjectId failed for value "123456789" at path "_id" for model "user"',
          name: "CastError",
          messageFormat: undefined,
          stringValue: id,
          kind: undefined,
          value: id,
          path: "_id",
        }),
    };

    return findUserDocById("123456789", mockModel).catch((err) => {
      expect(err.status).toBe(404);
      expect(err.error).toBeDefined();
      expect(err.error.errors).toBeTruthy();
      done();
    });
  });

  test.skip("Deleting a user that don't exits", (done) => {
    const mockModel = {
      deleteOne: (obj) => Promise.reject(obj),
    };

    return deleteUserDocById("12315456787987", mockModel).catch((err) => {
      expect(err.status).toBe(404);
      expect(err.error).toBeDefined();
      expect(err.error.errors).toBeTruthy();
      done();
    });
  });
});
