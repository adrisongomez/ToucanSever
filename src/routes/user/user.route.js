const express = require("express");
const UserRoute = express.Router();
const User = require("../../models/user/user.model");
const {
  findUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser
} = require("../../handlers/user/user.helper");

UserRoute.get("/test", (req, res, next) => {
  res.send("TEST");
});

UserRoute.get("/:id", findUserById(User));
UserRoute.get("/", findUsers(User));
UserRoute.post("/", createUser(User));
UserRoute.put("/:id", updateUser(User));
UserRoute.delete("/:id", deleteUser(User));

module.exports = UserRoute;
