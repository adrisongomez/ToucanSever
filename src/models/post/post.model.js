const { model, Schema } = require("mongoose");
const { check } = require("express-validator");

const Comments = Schema({
    comment = {
        type: String,
        required: true,
        validate: comment => check(comment).isEmpty(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    replies: {
        type:[Comments],
        default: [],
    },
});

const Post = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
  title: {
    type: String,
    require: true,
    validate: (title) => check(title).isEmpty(),
  },
  description: {
    type: String,
  },
  comments: {
      type: [Comments],
      default: [],
  },
  resources: {
      type: String,
      validate: (resources) => check(resources).isURL(),
  }
});

module.exports = model('post', Post);