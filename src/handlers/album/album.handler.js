const {
  addAlbum,
  getAlbum,
  deleteAlbum,
} = require("../../controller/album/album.controller");

exports.addAlbumToUser = (User) => async (req, res, next) => {
  const album = {
    name: req.body.name || undefined,
    resources: req.body.resources || [],
  };
  const parentId = req.params.idParent || undefined;
  try {
    const result = await addAlbum(parentId, album, User);
    res.status(201).json(result);
  } catch (error) {
    next({ status: 400, error: error });
  }
};

exports.getAlbumFromUser = (User) => async (req, res, next) => {
  const idParent = req.params.idParent;
  const idAlbum = req.params.idAlbum;
  try {
    const result = await getAlbum(idAlbum, idParent, User);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    next({ status: 404, error });
  }
};

exports.deleteAlbumFromUser = (User) => async (req, res, next) => {
  const idParent = req.params.idParent;
  const idAlbum = req.params.idAlbum;
  try {
    const result = await deleteAlbum(idAlbum, idParent, User);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    next({ status: 404, error });
  }
};
