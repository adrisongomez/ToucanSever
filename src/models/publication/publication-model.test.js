const User = require("../../models/user/user.model");
const Publication = require("../../models/publication/publication.model");

const {
  closeDatabase,
  dropDatabase,
  connect,
} = require("../../__mocks__/db.testHelper");
const {
  mockUserData,
  mockPublication,
} = require("../../__mocks__/utils.testHelper");

const user = mockUserData();

beforeAll(async () => {
  await connect();
});
afterEach(async () => {
  await dropDatabase();
});
afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

describe("Publication model work correctly", () => {
  test("Create a Publication", (done) => {
    let userId;
    let publication;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publication = mockPublication(userId);
        return Publication.create(publication);
      })
      .then((resp) => {
        expect(publication.description).toBe(resp.description);
        expect(publication.author).toBe(resp.author);
        done();
      });
  });

  test("Find a publication", (done) => {
    let userId;
    let publications;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publications = Array.from(Array(5), () => mockPublication(userId));
        return Publication.create(publications);
      })
      .then(() => Publication.find())
      .then((resp) => {
        expect(resp.length).toBe(5);
        expect(resp[0].description).toBe(publications[0].description);
        done();
      });
  });

  test("Find a publication by Id", (done) => {
    let userId;
    let publications;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publications = Array.from(Array(5), () => mockPublication(userId));
        return Publication.create(publications);
      })
      .then((listUser) => Publication.findById(listUser[0]))
      .then((resp) => {
        expect(resp.description).toBe(publications[0].description);
        expect(resp.author).toStrictEqual(userId);
        done();
      });
  });

  test("Delete a publication by Id", (done) => {
    let userId;
    let publication;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publication = mockPublication(userId);
        return Publication.create(publication);
      })
      .then((resp) => Publication.deleteOne({ _id: resp._id }))
      .then((resp) => {
        expect(resp.n).toBe(1);
        expect(resp.deletedCount).toBe(1);
        done();
      });
  });

  test("Update a publication by Id", (done) => {
    let userId;
    let publication;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publication = mockPublication(userId);
        return Publication.create(publication);
      })
      .then((resp) => {
        resp.description = "This is a publication";
        return Publication.updateOne(resp);
      })
      .then((resp) => {
        expect(resp.n).toBe(1);
        expect(resp.nModified).toBe(1);
        done();
      });
  });
});

describe("Publication model work incorrectly", () => {
  test("Create a publication with a description blank", () => {
    let userId;
    let publication;
    User.create(user).then((mockUser) => {
      userId = mockUser._id;
      publication = mockPublication(userId);
      publication.description = "";
      return expect(Publication.create(publication)).rejects.toThrow();
    });
  });

  test("Find a publication with a idPublication that doesn't exist", () => {
    return expect(Publication.findById("123456789")).rejects.toThrow();
  });

  test("Delete a publication with a idPublication that doesn't exist", () => {
    return expect(
      Publication.deleteOne({ _id: "123456789" })
    ).rejects.toThrow();
  });
  test("Update a publication with a description blank", () => {
    let userId;
    let publication;
    User.create(user)
      .then((mockUser) => {
        userId = mockUser._id;
        publication = mockPublication(userId);
        return Publication.create(publication);
      })
      .then((resp) => {
        resp.description = "";
        return expect(
          Publication.updateOne({ _id: resp._id }, resp, {
            runValidators: true,
          })
        ).rejects.toThrow();
      });
  }); 
});
