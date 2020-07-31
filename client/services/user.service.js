import axios from "axios";
import http from "../utils/http.utils";

const fetch = http(axios);

const endpoint = "/api/auth/credential";

function AuthService() {}

AuthService.prototype.login = async (credentialData) => {
  try {
    const resp = await fetch.postData(`${endpoint}/login`, credentialData);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

const isEmail = () => {};

export default AuthService;
