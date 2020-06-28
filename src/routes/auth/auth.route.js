const { Router } = require("express");

const Credential = require("../../models/credential/credential.model");
const User = require("../../models/user/user.model");

const { loginUserCrendential, refreshToken, logoutCredential } = require("../../handlers/credential/credential.handler");

const AuthRoute = Router();

AuthRoute.post("/credential/login", loginUserCrendential(Credential, User));
AuthRoute.get("/refresh", refreshToken(Credential));
AuthRoute.delete("/credential/logout", logoutCredential());

module.exports = AuthRoute;
