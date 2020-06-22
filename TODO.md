TODO: Create a CRUD for albums.
TODO: Implements UserCredential module, JWT and Passport Js.
TODO: Start making prototype.

---- CRUD albums

Schema Album: {
    name: String,
    resources: [Resource],
    author: User,
},

Schema Resource: {
    type: ('video', 'image');
    url: '',
}


Routes:

    albums
    -/user/:idParent/album/ => POST createAlbums
    -/user/:idParent/album/ => GET getAllAlbums
    -/user/:idParent/album/:idAlbum => GET getAlbum
    -/user/:idParent/album/:idAlbum => PUT updateResourcesAlbum
    -/user/:idParent/album/:idAlbum => DELETE deleteAlbum

    resources
    -/parent/:idParent/
    -/user/:idUser/album/:idAlbum/            => POST addResourceToAlbum
    -/user/:idUser/album/:idAlbum/:idResource => GET getUrlResource
    -/user/:idUser/album/:idAlbum/:idResource => DELETE deleteResource -- This route has to go to the CDN and delete there too.

TODos:

    TODO: Create Handler
        Happy Path Tested
        Bad Path Tested
    TODO: Create Routes
        Happy Path Tested
        Bad Path Tested


/handlers/resources
/handlers/album

/routes/album
/routes/resources


Handlers put a forIn that catch error and put those error in a variable that it gonna be throw it.