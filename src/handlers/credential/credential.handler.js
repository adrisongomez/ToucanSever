const { loginCredential, createCredential, loginEmail } = require("../../controller/credential/credential.controller");
const { accessJWTGenerator, refreshJWTGenerator, isRefreshJWT, isAccessJWT } = require("../../auth/generator/auth");
const { isValidObjectId } = require("mongoose");

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

exports.refreshToken = (Credential) => async (req, res, next) => {
  const jwt = req.cookies.wjt;
  if (!jwt) return Unathorized(res);
  const payload = isRefreshJWT(jwt);
  if (!payload) return Unathorized(res);
  const { username, user } = payload;
  if (!username) return Unathorized(res);
  const credential = await Credential.findOne({ username }).catch((err) => undefined);
  if (!credential) return Unathorized(res);
  return successfullyLogin({ user, username }, res);
};

exports.logoutCredential = () => async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return Unathorized(res);
  const token = authorization.split(" ")[1];
  const payload = isAccessJWT(token);
  if (!payload) return Unathorized(res);
  const { username } = payload;
  return successfullyLogout(username, res);
};

const successfullyLogout = (username, res) =>
  res
    .status(200)
    .cookie("wtj", "", {
      httpOnly: true,
      path: "api/auth/refresh",
    })
    .json({
      status: "ok",
      message: "logout success",
      username,
      accessToken: "",
    });

const Unathorized = (res) => res.status(401).cookie("wtj", "").json({ status: "fail", message: "Unauthorized" });

const successfullyLogin = ({ user, username, status = "ok", message = "Refreshed tokken" }, res) => {
  const accessToken = accessJWTGenerator({ username, user });
  const refreshToken = refreshJWTGenerator({ username, user });
  return res
    .status(200)
    .cookie("wtj", refreshToken, {
      httpOnly: true,
      path: "api/auth/refresh",
    })
    .json({ status, message, accessToken });
};
