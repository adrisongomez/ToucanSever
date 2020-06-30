const RootRouter = require("express").Router();
const UserRoute = require("./user/user.route");
const PublicationRoute = require("./publication/publication.route");
const AuthRoute = require("./auth/auth.route");

const { errorRouteHandler, unkwonRouteGenericHandler } = require("../handlers/error/error.handler");

RootRouter.get("/test", (req, res, next) => {
  res.status(200).send("testing");
});

RootRouter.use("/user", UserRoute);
RootRouter.use("/publication", PublicationRoute); // Comments Router defined inside it
RootRouter.use("/auth", AuthRoute);

RootRouter.use(unkwonRouteGenericHandler());
RootRouter.use(errorRouteHandler());

module.exports = RootRouter;
