const faker = require("faker");

const {connect, closeDatabase, dropDatabase,} = require("../../testHelpers/db.testHelper");
const User = require("./user.model");

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

describe("User model test", () => {
  beforeAll(() => connect());

  afterAll(() => closeDatabase());

  afterEach(() => dropDatabase());

  it("Should create a User", () => {
    const newUser = new User(mockUserData());
    return User.create(newUser).then((resp) =>
      expect(resp.firstName).toEqual(newUser.firstName)
    );
  });

  it("Should delete a User", () => {
    const newUser = new User(mockUserData());
    return User.create(newUser)
      .then((resp) => User.findByIdAndDelete(resp._id))
      .then(() => User.find({}))
      .then((resp) => expect(resp).toEqual([]));
  });

  it("Should find a User", async () => {
    const newUser = new User(mockUserData());
    await User.deleteMany();
    let saveUser = await User.create(newUser);
    // console.log(saveUser.id);
    let findedUser = await User.findById(saveUser._id);
    expect(findedUser.id).toBe(saveUser.id);
  });

  it("Should find many User", () => {
    const user1 = new User(mockUserData());
    const user2 = new User(mockUserData());
    return User.create(user1)
      .then(() => User.create(user2))
      .then(() => User.find())
      .then((resp) => expect(resp.length).toBe(2));
  });

  it("Should find update a User", () => {
    const newUser = new User(mockUserData());
    return newUser
      .save()
      .then((createUser) => {
        createUser.firstName = "Tato";
        createUser.lastName = "Joshua";
        return createUser.save();
      })
      .then((updateUser) => {
        expect(updateUser.firstName).toBe("Tato");
        expect(updateUser.lastName).toBe("Joshua");
      });
  });
});
