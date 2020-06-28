"use strict";
const { loginUserCrendential, logoutCredential, refreshToken } = require("./credential.handler");
const { createRequest, createResponse } = require("node-mocks-http");
const { mockUserCredentialData, mockUserData } = require("../../__mocks__/utils.testHelper");
const { accessJWTGenerator, isAccessJWT, refreshJWTGenerator, isRefreshJWT } = require("../../auth/generator/auth");

const Stuff = () => {
  const res = createResponse();
  const next = ({ status, error }) => {
    res.status(status).json(error);
  };
  return { res, next };
};

const credential = new mockUserCredentialData();
const user = mockUserData();
const idUser = 1;

describe("Login handler", () => {
  const req = createRequest({
    method: "POST",
    body: {
      ...credential,
    },
  });
  it("should work correctly, Username", async () => {
    const { res, next } = Stuff();
    const mockModel = {
      isValid: (obj) => true,
    };
    await loginUserCrendential(mockModel, {})(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
    expect(isAccessJWT(data.accessToken, "ACCESS")).toBeTruthy();
  });

  it("should work correctly, Email", async () => {
    const { next, res } = Stuff();
    const req = createRequest({
      body: {
        email: user.email,
        password: credential.password,
      },
    });
    const mockModelUser = {
      findOne: (obj) => Promise.resolve(user),
    };
    const mockModelCrendential = {
      findOne: (obj) => ({ user: idUser }),
      isValid: (obj) => Promise.resolve(true),
    };
    await loginUserCrendential(mockModelCrendential, mockModelUser)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
  });

  it("should not work correctly, credential not valid", async () => {
    const { res, next } = Stuff();
    const mockModel = {
      isValid: (obj) => false,
    };
    await loginUserCrendential(mockModel, {})(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(403);
    expect(data.status).toBe("fail");
  });
});

describe("refreshToken handler", () => {
  const req = createRequest({
    cookies: {
      wjt: refreshJWTGenerator({ username: "user", user: "id" }),
    },
  });
  it("should work correctly", async () => {
    const { res, next } = Stuff();
    const mockModel = {
      findOne: (obj) =>
        Promise.resolve({
          user: "id",
        }),
    };
    await refreshToken(mockModel)(req, res, next);
    const data = res._getJSONData();
    const headers = res.cookies;
    expect(data.accessToken).toBeDefined();
    expect(isRefreshJWT(headers.wtj.value)).toBeDefined();
  });

  it("should not work correctly, tokken is not valid", async () => {
    req.cookies.wjt = "NOT VALID COKKIE";
    const { res, next } = Stuff();
    const mockModel = {
      findOne: (obj) =>
        Promise.resolve({
          user: "id",
        }),
    };
    await refreshToken(mockModel)(req, res, next);
    const data = res._getJSONData();
    const headers = res.cookies;
    expect(data.accessToken).not.toBeDefined();
    expect(headers.wtj.value).toBeFalsy();
  });
  it("should not work correctly, User not valid or Username no valid", async () => {
    req.cookies.wjt = refreshJWTGenerator({ username: "username", user: "user" });
    const { res, next } = Stuff();
    const mockModel = {
      findOne: (obj) => Promise.reject(null),
    };
    await refreshToken(mockModel)(req, res, next);
    const data = res._getJSONData();
    const headers = res.cookies;
    expect(data.accessToken).not.toBeDefined();
    expect(headers.wtj.value).toBeFalsy();
  });
});

describe("logoutCredential handler", () => {
  it("should work correclty", async () => {
    const req = createRequest({
      headers: {
        authorization: `Beare ${accessJWTGenerator({ username: credential.username, user: "user" })}`,
      },
    });
    const { res, next } = Stuff();
    await logoutCredential()(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
  });

  it("should not work correctly, Headers Authorization not send or accessJWT not valid", async () => {
    const req = createRequest({
      headers: {
        authorization: `Beare NOT-VALID-TOKEN`,
      },
    });
    const { res, next } = Stuff();
    await logoutCredential()(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(401);
    expect(data.status).toBe("fail");
  });
});
