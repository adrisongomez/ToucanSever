const RootRouter = require("express").Router();

const UserRoute = require("./user/user.route");
const TripRoute = require("./trip/trip.route");

RootRouter.use("/user/", UserRoute);
RootRouter.use("/trip/", TripRoute);

module.exports = RootRouter;
