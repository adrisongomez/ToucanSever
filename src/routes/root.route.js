const RootRouter = require("express").Router();
const UserRoute = require("./user/user.route");
const {
  errorRouteHandler,
  unkwonRouteGenericHandler,
} = require("../handlers/error/error.handler");

RootRouter.get("/test", (req, res, next) => {
  res.status(200).send("testing");
});

RootRouter.use("/user/", UserRoute);

RootRouter.use(unkwonRouteGenericHandler());
RootRouter.use(errorRouteHandler());

module.exports = RootRouter;
