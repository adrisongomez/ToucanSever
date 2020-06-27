const { sign, verify } = require("jsonwebtoken");

exports.generateJWT = ({ user, username }, secret) => {
  if (!user || !username)
    throw { jwt: "tokken it can be generated(need credential)" };
  return sign({ _id: user, username }, secret, { expiresIn: "3m" });
};

exports.isValidJWT = (token, secret) => {
  try {
    const { user, username } = verify(token, secret);
    return { user, username };
  } catch (error) {
      throw {jwt: "Not Valid Token"}
  }
};
