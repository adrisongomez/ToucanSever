exports.createPublicationDoc = (publicationData, Publication) => {
  return Publication.create(publicationData)
    .then((publicationDoc) => {
      return publicationDoc
      .populate("author", "firstName lastName")
      .execPopulate();
    })
    .catch((err) => {
      console.log("susan");
      console.log(err);
      throw err;
    });
};
