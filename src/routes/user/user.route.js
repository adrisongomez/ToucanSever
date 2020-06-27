const express = require("express");
const UserRoute = express.Router();
const User = require("../../models/user/user.model");
const Credential = require("../../models/credential/credential.model");

const {
  findUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  toggleFollowUser,
} = require("../../handlers/user/user.handler");
const {
  addResourceToAlbum,
  deleteResourceFromAlbum,
  getResourceFromAlbum,
} = require("../../handlers/resources/resource.handler");
const {
  addAlbumToUser,
  deleteAlbumFromUser,
  getAlbumFromUser,
} = require("../../handlers/album/album.handler");

UserRoute.get("/:id", findUserById(User));
UserRoute.get("/", findUsers(User));
UserRoute.post("/", createUser(User, Credential));
UserRoute.put("/:id", updateUser(User));
UserRoute.delete("/:id", deleteUser(User));
UserRoute.post("/follow", toggleFollowUser(User));

//  Album Routes

UserRoute.post("/:idParent/album", addAlbumToUser(User));
UserRoute.get("/:idParent/album/:idAlbum", getAlbumFromUser(User));
UserRoute.delete("/:idParent/album/:idAlbum", deleteAlbumFromUser(User));

//  Resource Routes

UserRoute.post("/:idParent/album/:idAlbum/resource/", addResourceToAlbum(User));
UserRoute.get(
  "/:idParent/album/:idAlbum/resource/:idResource",
  getResourceFromAlbum(User)
);
UserRoute.delete(
  "/:idParent/album/:idAlbum/resource/:idResource",
  deleteResourceFromAlbum(User)
);

module.exports = UserRoute;
