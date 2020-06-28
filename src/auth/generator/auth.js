const { sign, verify } = require("jsonwebtoken");

generateJWTfn = (secret, expiresIn) => ({ user, username }) =>
  !user || !username
    ? undefined
    : sign({ user, username }, secret, { expiresIn });

isTokenFn = (secret) => (token) => {
  try {
    const { user, username } = verify(token, secret);
    return { user, username };
  } catch (error) {
    return undefined;
  }
};
module.exports = {
  accessJWTGenerator: generateJWTfn(
    process.env.SECRET_ACCESS || "ACCESS",
    "3m"
  ),
  refreshJWTGenerator: generateJWTfn(
    process.env.SECRET_REFRESH || "REFRESH",
    "7d"
  ),
  isAccessJWT: isTokenFn(process.env.SECRET_ACCESS || "ACCESS"),
  isRefreshJWT: isTokenFn(process.env.SECRET_REFRESH || "REFRESH"),
};
