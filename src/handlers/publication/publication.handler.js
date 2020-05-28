const {
  createPublicationDoc,
} = require("../../services/publication/publication.service");

exports.createPublication = (Publication) => (req, res, next) => {
  const publicationData = getPublicationDataFromReq(req);

  createPublicationDoc(publicationData, Publication)
    .then((createPub) => {
      res.status(201).json(createPub);
    })
    .catch((err) => {
      console.log(err.errors);
      res.status(400).send({
        hola: "hola",
      });
    });
};

const getPublicationDataFromReq = (req) => ({
  author: req.body.author || undefined,
  description: req.body.description || undefined,
  comments: req.body.comments || undefined,
});
