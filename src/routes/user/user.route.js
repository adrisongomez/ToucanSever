const express = require("express");
const UserRoute = express.Router();
const User = require("../../models/user/user.model");
const { createUser } = require("./user.utils");

UserRoute.get("/", (req, res, next) => {
  User.find({})
    .then((allUser) => {
      console.log(`Getting all User by ${req.hostname}`);
      res.status(200).send(allUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Something happen");
      throw err;
    });
});

UserRoute.post("/", createUser(User));

UserRoute.get("/faker", (req, res, next) => {
  console.log('esto se ejecuta')
  const fakeUser = Array.from(Array(10), () => {
    const newUser = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.exampleEmail(),
      country: faker.address.country(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip_code: faker.address.zipCode(),
      address: faker.address.streetAddress(),
    });
    User.create(newUser)
      .then(() => console.log("New User was created Successfully"))
      .catch((err) => console.error(err));
  });
  res.status(200).send(fakeUser);
});

module.exports = UserRoute;
