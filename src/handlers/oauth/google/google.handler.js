const { getUrlConsernGoogle, getUserDataFromGoogle } = require("../../../auth/provider/google/google.auth");

exports.googleRedirectHandler = (Client) => async (req, res, next) => {
  try {
    const client = Client();
    const url = getUrlConsernGoogle(client);
    return res.redirect(url);
  } catch (error) {
    return next({
      status: 500,
      error: error,
    });
  }
};

exports.googleCallbackHandler = (Client, OauthService) => async (req, res, next) => {
  const code = req.query.code;
  if (!code) return Unauthorized(next);
  const data = await getUserDataFromGoogle(code, Client(), OauthService());
  if (!data) return SomethingHappen(next);
  return res.status(200).json(data);
};

const Unauthorized = (next) =>
  next({
    status: 401,
    error: {
      status: "fail",
      message: "You shall not pass!",
    },
  });

const SomethingHappen = (next) =>
  next({
    status: 500,
    error: {
      status: "fail",
      message: "Something happen",
    },
  });
