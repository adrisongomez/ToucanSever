const RootRouter = require("express").Router();

const UserRoute = require("./user/user.route");
const TripRoute = require("./trip/trip.route");

RootRouter.get("/test", (req, res, next) => {
  res.status(200).send("testing");
});

RootRouter.use("/user/", UserRoute);
RootRouter.use("/trip/", TripRoute);

RootRouter.use((req, res, next) => {
  res.status(404).send({
    error: 404,
    message: "You cannot reach this route",
  });
});
module.exports = RootRouter;
