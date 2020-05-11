const RootRouter = require("express").Router();
const UserRoute = require("./user/user.route");

RootRouter.get("/test", (req, res, next) => {
  res.status(200).send("testing");
});

RootRouter.use("/user/", UserRoute);

RootRouter.use((req, res, next) => {
  res
    .status(404)
    .send({
      error: 404,
      message: "You cannot reach this route",
    })
    .end();
});
module.exports = RootRouter;
