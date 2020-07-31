require("dotenv").config();

const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

// Route Declaration
const RootRoute = require("./src/routes/root.route");

server.prepare().then(() => {
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
    console.log(`Server running on port ${port}`);
    let db = require("./src/models/db.connection");
    app.use("/api/", RootRoute);
    app.get("*", (req, res) => handle(req, res));
  });
});
