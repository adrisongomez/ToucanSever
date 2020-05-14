exports.createUserDoc = (UserData, UserModel) => {
  return UserModel.create(UserData);
};

exports.findUserDocById = (idUser, UserModel) => {
  return UserModel.findById(idUser).catch((err) => {
    throw _createErrorMessage({
      status: 404,
      message: `Error finding user by id(${idUser})`,
      errors: err,
    });
  });
};

exports.findAllUserDocs = (UserModel) => {
  return UserModel.find();
};

exports.findUserDocsPagination = ({ page, limit }, UserModel) => {
  return UserModel.find()
    .limit(limit)
    .skip(limit * page)
    .then((results) => _createPaginationObject({ page, limit }, results))
};

exports.updateUserDoc = (userId, userData, UserModel) => {
  return UserModel.updateOne(
    { _id: userId },
    userData
  ).then((resp) => ({ ...resp, data: { _id: userId, ...userData } }));
};

exports.deleteUserDocById = (userId, UserModel) => {
  return UserModel.deleteOne({ _id: userId })
    .then(() => ({ id: 0, message: "User deleted" }))
    .catch((err) => {
      throw _createErrorMessage({
        status: 404,
        message: `Error deleting user by id(${userId})`,
        errors: err,
      });
    });
};

const _createErrorMessage = ({ status, errors, message }) => ({
  status,
  error: {
    message,
    errors,
  },
});

const _createPaginationObject = ({ page, limit }, results) => ({
  page,
  limit,
  results,
});
