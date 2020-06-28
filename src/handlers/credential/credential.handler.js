const { loginCredential, createCredential, loginEmail } = require("../../controller/credential/credential.controller");
const { accessJWTGenerator, refreshJWTGenerator } = require("../../auth/generator/auth");

exports.loginUserCrendential = (Credential, User) => async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    if (username === undefined && email !== undefined) {
      const result = await loginEmail(email, password, Credential, User);
      return successfullyLogin(result, res);
    }
    const result = await loginCredential(username, password, Credential);
    return successfullyLogin(result, res);
  } catch (error) {
    next({ status: 403, error: error });
  }
};

exports.createUserCredential = (Credential) => async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const idUser = req.body.idUser;
  try {
    const result = await createCredential(username, password, idUser, Credential);
    res.status(201).json(result);
  } catch (error) {
    next({ status: 400, error });
  }
};

const successfullyLogin = ({ user, username, message, status }, res) => {
  const accessToken = accessJWTGenerator({ username, user });
  const refreshToken = refreshJWTGenerator({ username, user });
  return res
    .status(200)
    .cookie("wtj", refreshToken, {
      httpOnly: true,
      path: "/auth/refresh",
    })
    .json({ status, message, accessToken });
};
