"use strict";
const {
  loginUserCrendential,
  createUserCredential,
} = require("./credential.handler");
const { createRequest, createResponse } = require("node-mocks-http");
const {
  mockUserCredentialData,
  mockUserData,
} = require("../../__mocks__/utils.testHelper");

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
    await loginUserCrendential(mockModelCrendential, mockModelUser)(
      req,
      res,
      next
    );
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

describe("createUserCredential handler", () => {
  const req = createRequest({
    method: "POST",
    body: {
      ...credential,
      idUser: idUser,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = Stuff();
    const mockModel = {
      create: (obj) => Promise.resolve(obj),
    };
    await createUserCredential(mockModel, {})(req, res, next);
    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData().status).toBe("new");
  });

  it("should not work correctly ", async () => {
    const { res, next } = Stuff();
    const mockModel = {
      create: () =>
        Promise.reject({
          errors: {
            username: {
              message: "no valid",
            },
          },
        }),
    };

    await createUserCredential(mockModel, {})(req, res, next);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().credential).toBeDefined();
  });
});
