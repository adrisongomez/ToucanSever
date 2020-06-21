exports.getResource = async (idParent, idAlbum, idResource, Parent) => {
  try {
    const parentDoc = await Parent.findById(idParent);
    const album = parentDoc.albums.id(idAlbum);
    if (!album) {
      throw { id: 1, message: "Album not exists" };
    }
    const resource = album.resources.id(idResource);
    if (!resource) {
      throw { id: 1, message: "Resource not exists" };
    }
    return await resource;
  } catch (error) {
    if (error.path === "_id") {
      throw {
        id: 1,
        message: "Parent not exists",
      };
    }
    throw error;
  }
};

exports.deleteResource = async (idParent, idAlbum, idResource, Parent) => {
  try {
    const parentDoc = await Parent.findById(idParent);
    const albums = parentDoc.albums.id(idAlbum);
    if (!albums) {
      throw { id: 1, message: "Album not exists" };
    }
    const resource = albums.resources.id(idResource);
    if (!resource) {
      throw { id: 1, message: "Resource not exists" };
    }
    resource.remove();
    return await parentDoc.save();
  } catch (error) {
    if (error.path === "_id") {
      throw {
        id: 1,
        message: "Parent not exists",
      };
    }
    throw error
  }
};
