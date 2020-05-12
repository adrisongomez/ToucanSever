const express = require("express");
const UserRoute = express.Router();
const User = require("../../models/user/user.model");
const {
  findUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser
} = require("../../handlers/user/user.handler");

UserRoute.get("/:id", findUserById(User));
UserRoute.get("/", findUsers(User));
UserRoute.post("/", createUser(User));
UserRoute.put("/:id", updateUser(User));
UserRoute.delete("/:id", deleteUser(User));

module.exports = UserRoute;
