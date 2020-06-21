const { Schema } = require("mongoose");

const Resource = new Schema({
  type: {
    type: String,
    enum: ["video", "image"],
    default: "image",
  },
  url: {
    type: String,
    validate: {
      validator: new RegExp(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      ),
      message: "Profile Image is not valid",
    },
  },
});

module.exports = Resource;
