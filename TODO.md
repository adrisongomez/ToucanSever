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

Schema ResourceRef: {
    resourceId: ObjectId,
    albumId: ObjectId,
    author: ObjectId,
    }

Add to User Schema two fields: profileImg, albums:[Album], by default everytime a User is created has 3 albums: (Publications, Profile Pictures, BackgroundImage).
Add to Publications Schema a fields: resources: [Reosource]. by default all resources it's gonna point albums Publications.

Routes:

    albums
    -/user/:idParent/album/ => POST createAlbums
    -/user/:idParent/album/ => GET getAllAlbums
    -/user/:idParent/album/:idAlbum => GET getAlbum
    -/user/:idParent/album/:idAlbum => PUT updateResourcesAlbum
    -/user/:idParent/album/:idAlbum => DELETE deleteAlbum

    resources
    -/parent/:idParent/
    -/user/:idUser/album/:idAlbum/:idResource => GET getUrlResource
    -/user/:idUser/album/:idAlbum/:idResource => DELETE deleteResource -- This route has to go to the CDN and delete there too.

TODos:

    TODO: Create Services 
        Happy Path Tested
        Bad Path Tested
    TODO: Create Handler
        Happy Path Tested
        Bad Path Tested
    TODO: Create Routes
        Happy Path Tested
        Bad Path Tested

files:

/services/resources
/services/resourcesPub
/services/album

/handlers/resources
/handlers/resourcesRef
/handlers/album

/routes/album
/routes/resources
/routes/resourcesRef


Handlers put a forIn that catch error and put those error in a variable that it gonna be throw it.