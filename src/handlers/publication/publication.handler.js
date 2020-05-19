const {
  createPublicationDoc,
} = require("../../services/publication/publication.service");

exports.createPublication = (Publication) => (req, res, next) => {
  const publicationData = getPublicationDataFromReq(req);
  res.status(201);
  createPublicationDoc(publicationData, Publication)
    .then((createUser) => {
      res.status(201).json(createUser);
    })
    .catch((err) => next(err));
};

const getPublicationDataFromReq = (req) => ({
  author: req.body.author || undefined,
  description: req.body.description || undefined,
  comments: req.body.comments || undefined,
});
