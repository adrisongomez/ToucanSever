const axios = require("axios").default;
const endpoint = "http://localhost:5000/api";

describe("RootRoute is working", () => {
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

  describe("UserRoute is working", () => {
    it.todo("Should create an User when post request the /user");
    it.todo("Should get all the User when get request the /user");
    it.todo("Should find an User when get request the /user/:idUser");
    it.todo("Should update an User when update request the /user/:id");
    it.todo("Should delete an User when delete request the /user/:id");
  });
});
