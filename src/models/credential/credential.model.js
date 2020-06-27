const { model, Schema } = require("mongoose");
const { hashSync, compare } = require("bcrypt");
const salt = process.env.SALT || 10;

const UserCredential = new Schema({
  username: {
    type: String,
    match: [
      new RegExp(/^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/iu),
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
    unique: true,
  },
});

/**
 * @function
 * @name {isValidUser}
 * @param credential {Username, Password}
 *
 * This static function is used to verify is a credential is valid,
 */

UserCredential.static("isValid", async function ({ username, password }) {
  const userBd = await this.findOne({ username: username });
  if (!userBd) return false;
  const samePassword = await compare(password, userBd.password);
  if (!samePassword) return false;
  return true;
});

module.exports = model("credential", UserCredential);
