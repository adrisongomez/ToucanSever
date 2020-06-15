const Publication = require("../../models/publication/publication.model");
const User = require("../../models/user/user.model");
const { Router } = require("express");

const {
  createPublication,
  deletePublications,
  addCommentToPublication,
  getAllPublication,
  findPublication,
  findPublicationByUserId,
  updatePublication,
} = require("../../handlers/publication/publication.handler");

const PublicationRoutes = Router();

PublicationRoutes.post("/", createPublication(Publication));
PublicationRoutes.post("/comment/:idPublication", addCommentToPublication(Publication));
PublicationRoutes.delete("/", deletePublications(Publication));
PublicationRoutes.get("/land/:idUser", getAllPublication(Publication, User));
PublicationRoutes.get("/:idPublication", findPublication(Publication, User));
PublicationRoutes.get("/user/:idUser", findPublicationByUserId(Publication, User));
PublicationRoutes.put("/:idPublication", updatePublication(Publication));

module.exports = PublicationRoutes;
