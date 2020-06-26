const { model, Schema } = require("mongoose");
const { hashSync, compare } = require("bcrypt");
const salt = process.env.SALT || 10;

const UserCredential = new Schema({
  username: {
    type: String,
    match: [
      new RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
      "The username is not valid",
    ],
    required: true,
    unique: [true, "User must be unique"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
    set: (password) => hashSync(password, salt),
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    rel: "user",
    required: true,
  },
});

UserCredential.static("isUser", async function ({ username, password }) {
  const userBd = this.findOne({ username: username });
  if (!userBd) return false;
  const samePassword = await compare(password, userBd.password);
  if (!samePassword) return false;
  return true;
});

module.exports = model("credential", UserCredential);
