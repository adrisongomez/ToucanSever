const faker = require("faker");

exports.mockUserData = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.exampleEmail(),
  country: faker.address.country(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  address: faker.address.streetAddress(),
  followings: [],
  followers: [],
});

exports.mockPublication = (id) => ({
  author: id,
  description: faker.lorem.sentence(
    faker.random.number(15),
    faker.random.number(15)
  ),
  comments: Array.from(Array(5), () => ({
    comment: faker.lorem.words(10),
    author: id,
  })),
});

exports.mockCommentsData = (id) => ({
  comment: faker.lorem.words(10),
  author: id,
});
