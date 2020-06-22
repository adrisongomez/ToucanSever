const {
  createPublicationDoc,
  deletePublicationDoc,
  updatePublicationDoc,
  getAllPublicationDoc,
  findByIdPublicationDoc,
  findByIdPublicationDocByUserId: findPublicationDocByUserId,
  addPublicationWithResource,
} = require("../../controller/publication/publication.controller");

exports.createPublication = (Publication, User) => async (req, res, next) => {
  const publicationData = getPublicationDataFromReq(req);
  let albumData = undefined;
  if (req.body.album) albumData = getAlbumData(req);
  try {
    let response;
    if (albumData) {
      response = await addPublicationWithResource(
        publicationData,
        albumData,
        User,
        Publication
      );
    } else {
      response = await createPublicationDoc(publicationData, Publication);
    }
    res.status(201).json(response);
  } catch (error) {
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
    next({ status: 404, error: err });
  }
};

exports.getAllPublication = (Publication, User) => async (req, res, next) => {
  const idUser = req.params.idUser;
  try {
    const result = await getAllPublicationDoc(idUser, Publication, User);
    res.status(200).json(result);
  } catch (err) {
    next({ status: 400, error: err });
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

const getAlbumData = (req) => ({
  _id: req.body.album._id || undefined,
  name: req.body.album.name || undefined,
  resources: req.body.album.resources || undefined,
});
