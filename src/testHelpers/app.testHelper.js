const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;
let server;

exports.createTestApp = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  return app;
};

exports.listenApp = (app) => {
  if (server !== undefined) {
    const server = app.listen(port, () => {
      console.log("Test Express App Running");
    });
  }
};

exports.getRouter = () => express.Router();

exports.closeServer = () => express.closeServer;
