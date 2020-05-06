const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//Route Declaration
const UserRoute = require("./src/routes/user.route");

// Start appliccation
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
  const db = require("./src/models/db.connection");
});

app.get("/", (req, res) => {
  res.status(200).send("hola");
});

app.use("/api/user/", UserRoute);
