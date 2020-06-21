exports.addComment = async (publicationId, comment, Publication) => {
  try {
    const publication = await Publication.findById(publicationId);
    const doc =  await publication.comments.create(comment);
    publication.comments.push(doc);
    return await publication.save();
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Publication not exists" };
    }
    if (error.path === "author") {
      throw { id: 1, message: "Author not valid" };
    }
    throw error;
  }
};

exports.deleteComment = async (commentId, publicationId, Publication) => {
  try {
    const publication = await Publication.findById(publicationId);
    const comment = publication.comments.id(commentId);
    if (!comment) throw { id: 1, message: "Comment not exists" };
    comment.remove();
    return await publication.save();
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Publication not exists" };
    }
    throw error;
  }
};

exports.updateComment = async (
  commentId,
  publicationId,
  commentNew,
  Publication
) => {
  try {
    const publication = await Publication.findById(publicationId);
    const comment = publication.comments.id(commentId);
    if (!comment) throw { id: 1, message: "Comment not exists" };
    if (comment.author != commentNew.author) {
      throw { id: 1, message: "Not allowed, Author differents" };
    }
    comment.comment = commentNew.comment;
    return await publication.save();
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Publication not exists" };
    }
    throw error;
  }
};
