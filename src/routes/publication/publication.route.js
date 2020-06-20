const Publication = require("../../models/publication/publication.model");
const User = require("../../models/user/user.model");
const CommentRoutes = require('../comment/comment.route');
const { Router } = require("express");

const {
  createPublication,
  deletePublications,
  getAllPublication,
  findPublication,
  findPublicationByUserId,
  updatePublication,
} = require("../../handlers/publication/publication.handler");

const PublicationRoutes = Router();

PublicationRoutes.post("/", createPublication(Publication));
PublicationRoutes.delete("/:idPublication", deletePublications(Publication));
PublicationRoutes.get("/land/:idUser", getAllPublication(Publication, User));
PublicationRoutes.get("/:idPublication", findPublication(Publication, User));
PublicationRoutes.get("/user/:idUser", findPublicationByUserId(Publication, User));
PublicationRoutes.put("/:idPublication", updatePublication(Publication));

//Comments Route

PublicationRoutes.use("/comment", CommentRoutes);

module.exports = PublicationRoutes;
