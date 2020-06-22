// @ts-check

const { model, Schema } = require("mongoose");

const Comment = require("../comment/comment.schema");
const Resource = require("../resources/resource.schema");

const Publication = new Schema({
  description: {
    type: String,
    minlength: [1, "Description can't be empty"],
    required: [true, "Description is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Author is required"],
  },
  comments: [Comment],
  resources: [Resource],
});

module.exports = model("publication", Publication);
