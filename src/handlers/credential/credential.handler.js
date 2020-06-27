const {
  loginCredential,
  createCredential,
} = require("../../controller/credential/credential.controller");

exports.loginUserCrendential = (Credential) => async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await loginCredential(username, password, Credential);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 403, error: error });
  }
};

exports.createUserCredential = (Credential) => async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const idUser = req.body.idUser;
  try {
    const result = await createCredential(
      username,
      password,
      idUser,
      Credential
    );
    res.status(201).json(result);
  } catch (error) {
    next({ status: 400, error });
  }
};
