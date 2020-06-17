const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  errorRouteHandler,
  unkwonRouteGenericHandler,
} = require("../handlers/error/error.handler");

exports.createTestApp = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  return app;
};

exports.addGenericRoute = (app) => {
  app.use(unkwonRouteGenericHandler());
  app.use(errorRouteHandler());
};

exports.getRouter = () => express.Router();
