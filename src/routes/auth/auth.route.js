const { Router } = require("express");
const GoogleRoute = require("./google/google.route");

const Credential = require("../../models/credential/credential.model");
const User = require("../../models/user/user.model");

const { loginUserCrendential, refreshToken, logoutCredential } = require("../../handlers/credential/credential.handler");

const AuthRoute = Router();

AuthRoute.post("/credential/login", loginUserCrendential(Credential, User));
AuthRoute.get("/refresh", refreshToken(Credential));
AuthRoute.delete("/credential/logout", logoutCredential());
AuthRoute.use("/provider/google", GoogleRoute);

module.exports = AuthRoute;
