const mongooseError = require("mongoose-error-handler");

exports.createPublicationDoc = (publicationData, Publication) => {
  return Publication.create(publicationData)
    .then((publicationDoc) => {
      return publicationDoc
        .populate("author", "firstName lastName")
        .execPopulate();
    })
    .catch((err) => {
      const errors = mongooseError.set(err);
      throw errors;
    });
};
