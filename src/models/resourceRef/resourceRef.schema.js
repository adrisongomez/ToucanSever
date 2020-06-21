const { Schema } = require("mongoose");

const ResourceRef = new Schema({
  resourceId: {
    type: String,
    required: true,
  },
  albumId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
});

module.exports = ResourceRef;
