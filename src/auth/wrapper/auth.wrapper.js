const { verify } = require("jsonwebtoken");
const { isRefreshJWT } = require("../generator/auth");

exports.secureRoute = (handler) => async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return errorMessage(res);
  try {
    const token = authorization.split(" ")[1];
    const { username, user } = isRefreshJWT(token);
    req.token = {
      username,
      user,
    };
    return await handler(req, res, next);
  } catch (error) {
    return errorMessage(res);
  }
};

const errorMessage = (res) =>
  res.status(402).json({ status: "fail", message: "Unathorized" });
