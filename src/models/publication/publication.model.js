const { model, Schema } = require("mongoose");

const Comment = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: [true, "Author is required"],
  },
  comment: {
    type: String,
    minlength: [0, "Comment can't be empty"],
    required: [true, "Comment is required"],
  },
});

const Publication = Schema({
  description: {
    type: String,
    minlength: [0, "Description can't be empty"],
    required: [true, "Description is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Author is required"],
  },
  comments: {
    type: [Comment],
  },
});

module.exports = model("publication", Publication);
