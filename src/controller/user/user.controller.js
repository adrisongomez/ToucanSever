const errorHandler = require("mongoose-error-handler");

exports.createUserDoc = (UserData, UserModel) => {
  return UserModel.create(UserData).catch(error => {
    let { errors } = errorHandler.set(error);
    if (error.name === "MongoError" && error.code === 11000) {
      errors = { email: "Email must be unique." };
    }
    throw _createErrorMessage({
      status: 422,
      message: `Error creating a user`,
      errors: errors
    });
  });
};

exports.findUserDocById = (idUser, UserModel) => {
  return UserModel.findById(idUser).catch(error => {
    let { errors } = errorHandler.set(error);
    throw _createErrorMessage({
      status: 404,
      message: `Error finding user by id(${idUser})`,
      errors: errors
    });
  });
};

exports.findAllUserDocs = UserModel => {
  return UserModel.find();
};

exports.findUserDocsPagination = ({ page, limit }, UserModel) => {
  return UserModel.find()
    .limit(limit)
    .skip(limit * page)
    .then(results => _createPaginationObject({ page, limit }, results));
};

exports.updateUserDoc = (userId, userData, UserModel) => {
  return UserModel.updateOne({ _id: userId }, userData).then(resp => ({
    ...resp,
    data: { _id: userId, ...userData }
  }));
};

exports.deleteUserDocById = (userId, UserModel) => {
  return UserModel.deleteOne({ _id: userId })
    .then(() => ({ id: 0, message: "User deleted" }))
    .catch(error => {
      let { errors } = errorHandler.set(error);
      throw _createErrorMessage({
        status: 404,
        message: `Error deleting user by id(${userId})`,
        errors: errors
      });
    });
};

exports.toggleFollowToUserDoc = async (userId, friendId, UserModel) => {
  const user = await UserModel.findById(userId);
  const friend = await UserModel.findById(friendId);
  const hasFriend = friend => !!user.followings.find(following => following === friend._id);

  //Unfollow
  if (hasFriend(friend)) {
    user.followings = user.followings.map(following => following !== friend.id);
    friend.followings = user.followings.map(following => following !== friend.id);
    await UserModel.updateOne(userId, user);
    await UserModel.updateOne(friendId, friend);
    return { id: 1, message: "You are unfollowing!" };
  }

  user.followings.push(friend._id);
  friend.followers.push(user._id);
  await UserModel.updateOne({ _id: userId }, user);
  await UserModel.updateOne({ _id: friendId }, friend);
  return { id: 0, message: "You are following!" };
};

const _createErrorMessage = ({ status, errors, message }) => ({
  status,
  error: {
    message,
    errors
  }
});

const _createPaginationObject = ({ page, limit }, results) => ({
  page,
  limit,
  results
});
