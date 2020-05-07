const axios = require("axios").default;

describe("Sever is running", () => {
  it('Should Reach "/" endpoint', () => {
    return axios
      .get("http://localhost:5000/")
      .then((resp) => expect(resp.status).toBe(200))
  });
});
