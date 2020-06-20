const { model, Schema } = require("mongoose");

const Album = require("../album/album.schema");

const User = Schema({
  firstName: {
    type: String,
    required: [true, "The first name is required"],
  },

  lastName: {
    type: String,
    required: [true, "The lastname is required"],
  },
  imgProfile: {
    type: String,
    validate: {
      validator: (img) =>
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          img
        ),
      message: "Profile Image is not valid",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (email) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      message: "Email is not valid",
    },
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
    required: [true, "Zipcode is required"],
    validate: {
      validator: (zipCode) => /^\d{5}$|^\d{5}-\d{4}$/.test(zipCode),
      message: "ZipCode is not valid",
    },
  },
  address: {
    type: String,
    required: true,
  },
  followings: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
  },
  albums: [Album],
});

module.exports = model("user", User);
