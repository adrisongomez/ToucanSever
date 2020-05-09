const axios = require("axios").default;
const RootRoute = require("./root.route");
const endpoint = "http://localhost:8000/api";
const { createTestApp, getRouter } = require("../testHelpers/app.testHelper");

const app = createTestApp();

let server = undefined;

describe("RootRoute is working", () => {
  beforeAll(async () => {
    server = app.listen(8000);
    app.use("/api", RootRoute);
});
  afterAll(() => server.close());
  test("Reach /test endpoint and return status ok (200)", () => {
    return axios
      .get(`${endpoint}/test`)
      .then((resp) => expect(resp.status).toBe(200));
  });

  test("Reaching an Unkown endpoint like /test1", () => {
    return axios.get(`${endpoint}/test1`).catch(({ response }) => {
      expect(response.status).toBe(404);
      expect(response.data.error).toBe(404);
      expect(response.data.message).toBe("You cannot reach this route");
    });
  });
});
