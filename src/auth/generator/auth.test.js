const { verify } = require("jsonwebtoken");

const {
  accessJWTGenerator,
  refreshJWTGenerator,
  isAccessJWT,
  isRefreshJWT,
} = require("./auth");

const credential = {
  user: "THIS IS A VALID USER ID",
  username: "THIS IS A VALID USERNAME",
};

const secretAccess = "ACCESS";
const secretRefresh = "REFRESH";

describe("accessJWTGenerator", () => {
  it("should create a token", () => {
    const accessToken = accessJWTGenerator(credential);
    const payload = verify(accessToken, secretAccess);
    expect(accessToken).toBeDefined();
    expect(credential.user).toBe(payload.user);
  });

  it("should not create a token, no user and username", () => {
    const accessToken = accessJWTGenerator({});
    expect(accessToken).toBeUndefined;
  });
});

describe("refreshJWTGenerator", () => {
  it("should create a tokken", () => {
    const refreshToken = refreshJWTGenerator(credential);
    const payload = verify(refreshToken, secretRefresh);
    expect(refreshToken).toBeDefined();
    expect(credential.user).toBe(payload.user);
  });
  it("should not create a token, no user and username", () => {
    const refreshToken = refreshJWTGenerator({});
    expect(refreshToken).toBeUndefined();
  });
});

describe("isAccessJWT", () => {
  it("should validate access token", () => {
    const token = accessJWTGenerator(credential);
    const valid = isAccessJWT(token);
    const payload = verify(token, secretAccess);
    expect(valid.user).toBe(payload.user);
  });

  it("should not validate access token no valid", () => {
    const valid = isAccessJWT("NOT VALID TOKEN");
    expect(valid).toBeUndefined();
  });
});

describe("isRefreshJWT", () => {
  it("should validate refresh token", () => {
    const token = refreshJWTGenerator(credential);
    const valid = isRefreshJWT(token);
    const payload = verify(token, secretRefresh);
    expect(valid.user).toBe(payload.user);
  });
  it("should not validate refresh token not valid", () => {
    const valid = isRefreshJWT("NOT VALID TOKEN");
    expect(valid).toBeUndefined();
  });
});
