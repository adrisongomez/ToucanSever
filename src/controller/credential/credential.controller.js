const { findOne } = require("../../models/user/user.model");

exports.createCredential = async (username, password, idUser, Credential) => {
  try {
    return await Credential.create({ username, password, user: idUser });
  } catch (error) {
    if (error.code === 11000)
      throw {
        credential: {
          unique: "Username or Email is not unique",
        },
      };
    if (error.errors.password) {
      throw {
        credential: {
          password: error.errors.password.message,
        },
      };
    }
    if (error.errors.username) {
      throw {
        credential: {
          password: error.errors.username.message,
        },
      };
    }
    throw error;
  }
};

exports.loginCredential = async (username, password, Credential) => {
  const resp = await Credential.isValid({ username, password });
  return loginResponse(resp);
};

exports.loginEmail = async (email, password, Credential, User) => {
  const user = await User.findOne({ email });
  if (!user) return userNotExist();
  const { _id } = user;
  const { username } = await Credential.findOne({ user: _id });
  return this.loginCredential(username, password, Credential);
};

const userNotExist = () => ({
  status: "fail",
  message: "User not exists",
});

const loginResponse = (resp) =>
  resp
    ? { status: "ok", message: "User logged", tokken: "" }
    : { status: "fail", message: "username or password are not valid" };
