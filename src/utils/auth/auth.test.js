const { verify, sign } = require("jsonwebtoken");

const { generateJWT, isValidJWT } = require("./auth");

const credential = {
  user: "THIS IS A VALID USER ID",
  username: "THIS IS A VALID USERNAME",
};

const secret = "secret";

describe("generateJWT fn", () => {
  it("should work correctly", () => {
    const jwt = generateJWT(credential, secret);
    expect(jwt).toBeTruthy();
    expect(verify(jwt, secret)).toBeTruthy();
  });

  it("should not work correctly, not credential", () => {
    try {
      generateJWT({}, "hola");
    } catch (error) {
      expect(error.jwt).toBeDefined();
    }
  });
});

describe("isValidJWT fn", () => {
  it("should work correclty", () => {
    const jwt = sign(credential, secret, { expiresIn: "3m" });
    const result = isValidJWT(jwt, secret);
    expect(result).toStrictEqual(credential);
  });

  it("should work not correctly, not valid jwt or expire jwt", () => {
    const jwt = "THIS IS A NOT VALID JWT";
    try {
      isValidJWT(jwt, secret);
    } catch (error) {
      expect(error.jwt).toBe("Not Valid Token");
    }
  });
});
