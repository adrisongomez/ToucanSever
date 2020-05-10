const {
  createUserDoc,
  findUserDocById,
  findAllUserDocs,
  findUserDocsPagination,
  updateUserDoc,
} = require("../../services/user/user.service");

exports.createUser = (User) => (req, res, next) => {
  const userData = getUserFromRequest(req);
  createUserDoc(userData, User)
    .then((userDoc) => {
      res.status(201).json({
        status: "1",
        message: "The User was created successfully",
        user: userDoc,
      });
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).json({ status: "0", message: "Something Happen" });
      // throw err;
    });
};

exports.findUserById = (User) => (req, res, next) => {
  const idUser = req.params.id;
  findUserDocById(idUser, User)
    .then((resp) => {
      res.status(200).json(resp).end();
    })
    .catch((err) => {
      next(err);
    });
};

exports.findUsers = (User) => (req, res, next) => {
  const paginationOptions =
    req.query.page && req.query.limit
      ? { page: parseInt(req.query.page), limit: parseInt(req.query.limit) }
      : undefined;

  if (paginationOptions) {
    findUserDocsPagination(paginationOptions, User)
      .then((userPaginated) => {
        res.status(200).json(userPaginated).end();
      })
      .catch((err) => next(err));
  }
  findAllUserDocs(User)
    .then((allUser) => {
      res.status(200).json(allUser).end();
    })
    .catch((err) => next(err));
};

exports.updateUser = (User) => (req, res, next) => {
  const idUser = req.params.id || undefined;
  if (!idUser) throw "User Id is not defined, you must defined as params";
  const userData = getUserFromRequest(req);
  updateUserDoc(idUser, userData, User)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => next(err));
};

const getUserFromRequest = (req) => ({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  country: req.body.country,
  city: req.body.city,
  state: req.body.state,
  zipCode: req.body.zipCode,
  address: req.body.address,
});
