const {
  addComment,
  deleteComment,
  updateComment,
} = require("../../controller/comment/comment.controller");

exports.addCommentToPub = (Publication) => async (req, res, next) => {
  const idPub = req.params.idPublication;
  const comment = {
    comment: req.body.comment || "",
    author: req.body.author || "",
  };
  try {
    const result = await addComment(idPub, comment, Publication);
    res.status(201).json(result);
  } catch (error) {
    next({ status: 422, error: error });
  }
};

exports.deleteCommentToPub = (Publication) => async (req, res, next) => {
  try {
    const idPublication = req.params.idPublication || "";
    const idComment = req.params.idComment || "";
    const result = await deleteComment(idComment, idPublication, Publication);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error });
  }
};

exports.updateCommentInPub = (Publication) => async (req, res, next) => {
  try {
    const idPublication = req.params.idPublication || "";
    const idComment = req.params.idComment.trim() || "";
    const newComment = {
      comment: req.body.comment || "",
      author: req.body.author || undefined,
    };
    const result = await updateComment(
      idComment,
      idPublication,
      newComment,
      Publication
    );
    res.status(200).json(result);
  } catch (error) {
    next({status: 404, error});
  }
};
