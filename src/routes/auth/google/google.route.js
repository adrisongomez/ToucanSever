const { Client, GoogleOauthService } = require("../../../auth/provider/google/google.auth");
const { googleCallbackHandler, googleRedirectHandler } = require("../../../handlers/oauth/google/google.handler");

const route = require("express").Router();

route.get("/", googleRedirectHandler(Client));
route.get("/callback", googleCallbackHandler(Client, GoogleOauthService));

module.exports = route;
