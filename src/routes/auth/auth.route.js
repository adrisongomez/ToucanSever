const { Router } = require("express");

const Credential = require("../../models/credential/credential.model");
const User = require("../../models/user/user.model");

const {
  loginUserCrendential,
} = require("../../handlers/credential/credential.handler");

const AuthRoute = Router();

AuthRoute.post( "/credential/login", loginUserCrendential(Credential, User) );

module.exports = AuthRoute;
