const { model, Schema } = require("mongoose");
const { check } = require("express-validator");

const User = Schema({
  firstName: {
    type: String,
    required: true,
    validate: (firstName) => check(firstName).isEmpty(),
  },
  
  lastName: {
    type: String,
    required: true,
    validate: (lastName) => check(lastName).isEmpty(),
  },
  imgProfile: {
    type: String,
    validate: (img) => check(img).isURL(),
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (email) => check(email).isEmail(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    validate: (zipCode) => check(zipCode).isPostalCode(),
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = model("user", User);
