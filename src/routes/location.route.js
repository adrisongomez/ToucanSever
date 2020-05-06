const express = require("express");
const LocationRoute = express.Router();
const Location = require("../models/location/location.model");

LocationRoute.get("/fake", (req, res) => {
  const allLocation = Array.from(Array(10), () => {});
});