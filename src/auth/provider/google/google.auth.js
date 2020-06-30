// @ts-check

const { google } = require("googleapis");
exports.Client = () =>
  new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.DOMAIN || "http://localhost:7700"}/api/auth/provider/google/callback`,
  });

exports.GoogleOauthService = () => google.oauth2("v2");

exports.getUrlConsernGoogle = (client) => {
  const scope = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
  return client.generateAuthUrl({
    access_type: "offline",
    scope,
  });
};

exports.getUserDataFromGoogle = async (code, client, oauth) => {
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    const { data } = await oauth.userinfo.get({
      auth: client,
    });
    return data;
  } catch (error) {
    return null;
  }
};
