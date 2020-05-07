const { Router } = require("express");
const Trip = require("../../models/trip/trip.model");

const TripRoute = Router();

TripRoute.get("/", (req, res, next) => {
  Trip.find({})
    .then((listTrip) => {
      res.status(200).json(listTrip);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "1",
        message: "Something Happens",
      });
    });
});

module.exports = TripRoute;
