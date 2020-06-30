// @ts-check

const { google } = require("googleapis");
exports.Client = () =>
  new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.DOMAIN || "http://localhost:7700"}/api/auth/google/callback`,
  });

exports.getGoogleOauthService = () => google.oauth2("v2");

exports.getUrlConsernGoogle = (client) => {
  return client.generateAuthUrl();
};

exports.getUserDataFromGoogle = async (code, client, oauth) => {
  if (!code) return null;
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
