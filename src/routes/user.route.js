const express = require("express");
const UserRoute = express.Router();
const User = require("../models/user/user.model");
const faker = require("faker");

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

UserRoute.post("/", (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    country: req.body.country,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    address: req.body.address,
  };
  
  const newUser = new User(user);
  User.create(newUser)
    .then(() => {
      console.log("New User was created Successfully");
      res
        .status(201)
        .json({ status: "1", message: "The User was created successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(504).json({ status: "0", message: "Something Happen" });
      throw err;
    });
});

UserRoute.get("/faker", (req, res, next) => {
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
