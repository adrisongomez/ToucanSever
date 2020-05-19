exports.createPublicationDoc = (publicationData, Publication) => {
  return Publication.create(publicationData)
    .then((publicationDoc) =>
      publicationDoc.populate("author", "firstName lastName").execPopulate()
    )
    .catch((err) => {
      console.log(err);
      return err;
    });
};
