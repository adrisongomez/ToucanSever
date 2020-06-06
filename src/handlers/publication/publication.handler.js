const {
  createPublicationDoc,
} = require("../../services/publication/publication.service");

exports.createPublication = (Publication) => async (req, res, next) => {
  const publicationData = getPublicationDataFromReq(req);
  try {
    const response = await createPublicationDoc(publicationData, Publication);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      hola: "hola",
    });
  }

  // createPublicationDoc(publicationData, Publication)
  //   .then((createPub) => {
  //     res.status(201).json(createPub);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).send({
  //       hola: "hola",
  //     });
  // });
};

const getPublicationDataFromReq = (req) => ({
  author: req.body.author || undefined,
  description: req.body.description || undefined,
  comments: req.body.comments || undefined,
});
