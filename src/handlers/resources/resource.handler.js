const {
  getResource,
  addResource,
  deleteResource,
} = require("../../controller/resource/resource.controller");
const { restart } = require("nodemon");

exports.getResourceFromAlbum = (User) => async (req, res, next) => {
  const idParent = req.params.idParent;
  const idAlbum = req.params.idAlbum;
  const idResource = req.params.idResource;
  try {
    const result = await getResource(idParent, idAlbum, idResource, User);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error: error });
  }
};

exports.addResourceToAlbum = (User) => async (req, res, next) => {
  const idParent = req.params.idParent;
  const idAlbum = req.params.idAlbum;
  const resource = {
    type: req.body.type,
    url: req.body.url,
  };
  try {
    const result = await addResource(resource, idAlbum, idParent, User);
    res.status(201).json(result);
  } catch (error) {
    next({ status: 422, error });
  }
};

exports.deleteResourceFromAlbum = (User) => async (req, res, next) => {
  const idParent = req.params.idParent;
  const idAlbum = req.params.idAlbum;
  const idResource = req.params.idResource;
  try {
    const result = await deleteResource(idParent, idAlbum, idResource, User);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error });
  }
};
