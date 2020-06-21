const { Schema } = require("mongoose");

const Resource = require("../resources/resource.schema");

const Album = new Schema({
  name: {
    type: String,
    required: true,
  },

  resources: [Resource],
});

module.exports = Album;
