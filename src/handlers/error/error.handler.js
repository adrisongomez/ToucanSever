exports.unkwonRouteGenericHandler = () => (req, res, next) => {
  res
    .status(404)
    .send({
      error: 404,
      message: "You cannot reach this route",
    })
    .end();
};

exports.errorRouteHandler = () => (err, req, res, next) => {
  res.status(400).json(err).end();
};
