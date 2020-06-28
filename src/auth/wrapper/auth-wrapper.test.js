const { sign } = require("jsonwebtoken");
const { secureRoute } = require("./auth.wrapper");
const { createResponse, createRequest } = require("node-mocks-http");
const { refreshJWTGenerator } = require("../generator/auth");

const Stuff = () => {
  const res = createResponse();
  const next = (status, error) => {
    res.status(status).json(error);
  };
  const fn = jest.fn();
  return { res, next, fn };
};

const tokken = refreshJWTGenerator({ username: "username", user: "idUser" });
const expireTokken = sign({ ok: "true" }, "NOT VALID SECRET", {
  expiresIn: "100ms",
});

describe("secureRoute", () => {
  it("should work correctly", async () => {
    const req = createRequest({
      headers: {
        authorization: `Baere ${tokken}`,
      },
    });
    const { res, next, fn } = Stuff();
    await secureRoute(fn)(req, res, next);
    expect(fn).toBeCalled();
  });

  it("should not work correctly, Not valid tokken or expire tokken", async () => {
    const req = createRequest({
      headers: {
        authorization: `Baere ${expireTokken}`,
      },
    });
    const { res, next, fn } = Stuff();
    await secureRoute(fn)(req, res, next);
    expect(fn).not.toBeCalled();
    const data = res._getJSONData();
    expect(data.status).toBe("fail");
  });
});
