exports.addAlbum = async (parentId, albumData, Parent) => {
  try {
    const parentDoc = await Parent.findById(parentId);
    const album = parentDoc.albums.create(albumData);
    parentDoc.albums.push(album);
    return await parentDoc.save();
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Parent not exists" };
    }
    if (error.errors) {
      const keys = Object.keys(error.errors);
      let errors = {};
      keys.forEach((key) => {
        if (key.includes(".name") && key.includes("albums."))
          errors.name = "Name is required";
      });
      throw { id: 1, errors: errors };
    }
    throw error;
  }
};

exports.getAlbum = async (albumId, parentId, Parent) => {
  try {
    const parentDoc = await Parent.findById(parentId);
    const album = parentDoc.albums.id(albumId);
    if (!album) {
      throw { id: 1, message: "Album not exists" };
    }
    return album;
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Parent not exists" };
    }
    throw error;
  }
};

exports.deleteAlbum = async (idAlbum, idParent, Parent) => {
  try {
    const parentDoc = await Parent.findById(idParent);
    const album = parentDoc.albums.id(idAlbum);
    if (!album) {
      throw { id: 1, message: "Album not exists" };
    }
    album.remove();
    return await parentDoc.save();
  } catch (error) {
    if (error.path === "_id") {
      throw { id: 1, message: "Parent not exists" };
    }
    throw error;
  }
};
