import axios from "axios";
import http from "../utils/http.utils";

const fetch = http(axios);

const endpoint = "/api/auth/credential";
const login = (data) => fetch.postData(`${endpoint}/login`, data);

class AuthService {
  static async login(credentialData) {
    try {
      if (isValidEmail(credentialData.username) === true) {
        return await login({
          email: credentialData.username,
          password: credentialData.password,
        });
      }
      return await login(credentialData);
    } catch (error) {
      throw error.response.data;
    }
  }
}

function isValidEmail(username) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    username,
  );
}
export default AuthService;
