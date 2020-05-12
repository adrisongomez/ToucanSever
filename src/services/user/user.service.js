exports.createUserDoc = (UserData, UserModel) => {
  return UserModel.create(UserData).catch((err) => {
    if (err.code) {
      throw {
        message: "Error creating an User",
        errors: [{ message: "Email is used, please use another one" }],
      };
    }
    const errors = err.errors;
    const responseErros = Object.keys(errors).map((error) =>
      _mapErrorsToMessage(errors[error])
    );
    throw {
      message: "Error creating an User",
      errors: responseErros,
    };
  });
};

exports.findUserDocById = (idUser, UserModel) => {
  return UserModel.findById(idUser);
};

exports.findAllUserDocs = (UserModel) => {
  return UserModel.find();
};

exports.findUserDocsPagination = ({ page, limit }, UserModel) => {
  return UserModel.find()
    .limit(limit)
    .skip(limit * page)
    .then((results) => _createPaginationObject({ page, limit }, results));
};

exports.updateUserDoc = (userId, userData, UserModel) => {
  return UserModel.updateOne(
    { _id: userId },
    userData,
    UserModel
  ).then((resp) => ({ ...resp, data: { _id: userId, ...userData } }));
};

exports.deleteUserDoc = (userId, UserModel) => {
  return UserModel.deleteOne({ _id: userId })
    .then(() => ({ id: 0, message: "User deleted" }))
    .catch((err) => {
      throw err;
    });
};

const _mapErrorsToMessage = ({ message, value, reason }) => ({
  message,
  value,
  reason,
});

const _createPaginationObject = ({ page, limit }, results) => ({
  page,
  limit,
  results,
});
