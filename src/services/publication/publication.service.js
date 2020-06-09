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

exports.updatePublicationDoc = (
  idPublication,
  publicationNewData,
  Publication
) => {
  return Publication.updateOne({ _id: idPublication }, publicationNewData).then(
    (publicationDoc) => {
      return publicationDoc
        .populate("author", "firstName lastName")
        .execPopulate();
    }
  );
};

exports.deletePublicationDoc = (idPublication, Publication) => {
  return Publication.deleteOne({ _id: idPublication })
    .then((resp) => ({
      id: 0,
      message: "Publication deleted successfully",
    }))
    .catch((err) => ({
      status: 404,
      message: "Publication doesn't exict",
      id: 1,
    }));
};

exports.findAllDoc = (Publication) => {
  //*TODO: Make a Query for Friends*/
  return Publication.find({}).then()
};
