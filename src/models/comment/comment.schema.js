// @ts-check

const { Schema } = require("mongoose");
const Comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Author is required"],
  },
  comment: {
    type: String,
  },
});

Comment.path("comment").validate((obj) => !!obj , "Comment is not valid");

module.exports = Comment;
