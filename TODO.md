TODO: Create a CRUD for Comments.
TODO: Create a CRUD for albums.
TODO: Implements UserCredential module, JWT and Passport Js.
TODO: Start making prototype.

----CRUD for Comments----
# model
- add Index
- Split Publication model in two file: comment.schema and publication.model
TODO: model Happy Path
TODO: model Bad Path

# services:
- createComment MV addComent from Publication Service
- deleteComment
- updateComment 
TODO: service Happy Path
TODO: service Bad Path

# paths:
- /comment/:idPub       POST Add
- /comment/:idPub/idCom DELETE
- /comment/:idPub/idCom PUT Update
TODO: Route Happy Path
TODO: Route Bad Path