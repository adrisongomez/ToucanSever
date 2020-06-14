const {
  createPublicationDoc,
  deletePublicationDoc,
  findPublicationDoc,
  updatePublicationDoc,
} = require("../../services/publication/publication.service");

exports.createPublication = (Publication) => async (req, res, next) => {
  const publicationData = getPublicationDataFromReq(req);
  try {
    const response = await createPublicationDoc(publicationData, Publication);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
    next({
      status: 400,
      error,
    });
  }
};

exports.deletePublications = (Publication) => async (req, res, next) => {
  const idPub = req.params.idPublication;
  try {
    const result = await deletePublicationDoc(idPub, Publication);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
    next({ status: 404, err });
  }
};

const getPublicationDataFromReq = (req) => ({
  author: req.body.author || undefined,
  description: req.body.description || undefined,
  comments: req.body.comments || undefined,
});
