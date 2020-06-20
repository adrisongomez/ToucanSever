const { Schema } = require("mongoose");

const Resource = require("../resources/resource.schema");

const Album = new Schema({
  name: {
    type: String,
  },

  resources: [
    {
      type: Resource,
    },
  ],
});

module.exports = Album;
