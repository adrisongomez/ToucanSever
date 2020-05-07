const axios = require("axios").default;

axios
  .get("http://localhost:5000/")
  .then((resp) => console.log(resp.status))
  .catch((error) => console.error(error))
