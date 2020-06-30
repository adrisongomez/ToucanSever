const { googleRedirectHandler, googleCallbackHandler } = require("./google.handler");
const { createResponse, createRequest } = require("node-mocks-http");

const Stuff = () => {
  const res = createResponse();
  const next = ({ status, error }) => {
    return res.status(status).json(error);
  };
  return { res, next };
};

describe("googleRedirectHander", () => {
  const req = createRequest();
  it("should work correctly", async () => {
    const { res, next } = Stuff();
    const testUrl = "http://test.com/";
    const mockClient = () => ({
      generateAuthUrl: () => testUrl,
    });
    await googleRedirectHandler(mockClient)(req, res, next);
    const url = res._getRedirectUrl();
    expect(url).toBe(testUrl);
  });

  it("should not work correcly, if something happen", async () => {
    const { res, next } = Stuff();
    const mockClient = () => ({
      generateAuthUrl: () => {
        throw "Some error";
      },
    });
    await googleRedirectHandler(mockClient)(req, res, next);
    const status = res._getStatusCode();
    expect(status).toBe(500);
  });
});

describe("googleCallbackHandler", () => {
  it("should work correctly", async () => {
    const req = createRequest({
      query: {
        code: "THIS IS A CODE GENERETED BY GOOGLE",
      },
    });
    const { res, next } = Stuff();
    const mockClient = () => ({
      getToken: () => Promise.resolve({ tokens: {} }),
      setCredentials: () => {},
    });
    const mockOauthService = () => ({
      userinfo: {
        get: () => Promise.resolve({ data: { userId: 1 } }),
      },
    });
    await googleCallbackHandler(mockClient, mockOauthService)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(200);
    expect(data).toBeDefined();
    expect(data.userId).toBeDefined();
  });

  it("should not work correclty, not code", async () => {
    const req = createRequest();
    const { res, next } = Stuff();
    const mockClient = () => ({
      getToken: () => Promise.resolve({ tokens: {} }),
      setCredentials: () => {},
    });
    const mockOauthService = () => ({
      userinfo: {
        get: () => Promise.resolve({ data: { userId: 1 } }),
      },
    });
    await googleCallbackHandler(mockClient, mockOauthService)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(401);
    expect(data.status).toBe("fail");
  });

  it("should not work correctly, not data get it from google", async () => {
    const req = createRequest({
      query: {
        code: "THIS IS A CODE GENERETED BY GOOGLE",
      },
    });
    const { res, next } = Stuff();
    const mockClient = () => ({
      getToken: () => Promise.resolve({ tokens: {} }),
      setCredentials: () => {},
    });
    const mockOauthService = () => ({
      userinfo: {
        get: () => Promise.reject({ data: { userId: 1 } }),
      },
    });
    await googleCallbackHandler(mockClient, mockOauthService)(req, res, next);
    const data = res._getJSONData();
    const status = res._getStatusCode();
    expect(status).toBe(500);
    expect(data.status).toBe("fail");
  });
});
