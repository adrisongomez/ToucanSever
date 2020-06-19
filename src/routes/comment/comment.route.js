// @ts-check
const Publication = require("../../models/publication/publication.model");

const { Router } = require("express");

const { addCommentToPub, deleteCommentToPub, updateCommentInPub } = require("../../handlers/comments/comment.handler");

const CommentRoutes = Router();

CommentRoutes.post("/:idPublication", addCommentToPub(Publication));
CommentRoutes.delete("/:idPublication/:idComment", deleteCommentToPub(Publication));
CommentRoutes.put("/:idPublication/:idComment", updateCommentInPub(Publication));

module.exports = CommentRoutes;
