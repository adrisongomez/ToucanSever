const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//Route Declaration
const RootRoute = require("./src/routes/root.route");

// Start appliccation
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
  const db = require("./src/models/db.connection");
});

app.get("/", (req, res) => {
  res.status(200).send("hola");
});

app.use("/api/", RootRoute);
