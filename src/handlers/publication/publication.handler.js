const {
  createPublicationDoc,
  deletePublicationDoc,
  updatePublicationDoc,
  addCommentsToPublicationsDoc,
  getAllPublicationDoc,
  findByIdPublicationDoc,
  findByIdPublicationDocByUserId: findPublicationDocByUserId,
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

exports.addCommentToPublication = (Publication) => async (req, res, next) => {
  const idPub = req.params.idPublication;
  const comment = {
    comment: req.body.comment,
    author: req.body.author,
  };
  try {
    const result = await addCommentsToPublicationsDoc(
      idPub,
      comment,
      Publication
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json(err);
  }
};

exports.getAllPublication = (Publication, User) => async (req, res, next) => {
  const idUser = req.params.idUser;
  try {
    const result = await getAllPublicationDoc(idUser, Publication, User);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.findPublication = (Publication) => async (req, res, next) => {
  const idPublication = req.params.idPublication;
  try {
    const result = await findByIdPublicationDoc(idPublication, Publication);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 400, error });
  }
};

exports.findPublicationByUserId = (Publication) => async (req, res, next) => {
  const idUser = req.params.idUser;
  try {
    const result = await findPublicationDocByUserId(idUser, Publication);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error });
  }
};

exports.updatePublication = (Publication) => async (req, res, next) => {
  const idPublication = req.params.idPublication;
  const publicationUpdate = getPublicationDataFromReq(req);
  try {
    const result = await updatePublicationDoc(
      idPublication,
      publicationUpdate,
      Publication
    );
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error });
  }
};

const getPublicationDataFromReq = (req) => ({
  author: req.body.author || undefined,
  description: req.body.description || undefined,
  comments: req.body.comments || [],
});
