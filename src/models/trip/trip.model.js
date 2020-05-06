const { model, Schema } = require("mongoose");
const { check } = require("express-validator");

const Trip = Schema({
  name: {
    type: String,
    required: true,
    validate: (trip) => check(trip).isEmpty(),
  },
  price: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  limitParticipant: {
    type: Number,
    default: 0,
    required: true,
  },
  currentParticipant: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      validate: (url) => check(url).isURL(),
    },
  ],
  participant: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  mainPlace: {
    type: String,
    required: true,
  },
});

module.exports = model("trip", Trip);
