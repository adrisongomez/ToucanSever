const Publication = require("../../models/publication/publication.model");
const { Router } = require("express");

const {
  createPublication,
} = require("../../handlers/publication/publication.handler");

const PublicationRoutes = Router();

PublicationRoutes.post("/", createPublication(Publication));

module.exports = PublicationRoutes;
