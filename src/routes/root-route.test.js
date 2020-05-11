const axios = require("axios").default;
const mongoose = require("mongoose");
const RootRoute = require("./root.route");
const endpoint = "http://localhost:8000/api";
const { createTestApp, getRouter } = require("../testHelpers/app.testHelper");

const app = createTestApp();
const server = app.listen(8000);

describe("RootRoute is working", () => {
  beforeAll(async () => {
    app.use("/api", RootRoute);
  });
  afterAll(async () => {
    mongoose.connections.forEach(async con => {
      await con.close();
    });
    await mongoose.disconnect();
    await server.close();
  });
  test("Reach /test endpoint and return status ok (200)", (done) => {
    return axios.get(`${endpoint}/test`).then((resp) => {
      expect(resp.status).toBe(200);
      done();
    });
  });

  test("Reaching an Unkown endpoint like /test1", (done) => {
    return axios.get(`${endpoint}/test1`).catch(({ response }) => {
      expect(response.status).toBe(404);
      expect(response.data.error).toBe(404);
      expect(response.data.message).toBe("You cannot reach this route");
      done();
    });
  });
});
