const httpMock = require("node-mocks-http");

const {
  mockCommentsData,
  mockPublication,
} = require("../../__mocks__/utils.testHelper");
const {
  addCommentToPub,
  deleteCommentToPub,
  updateCommentInPub,
} = require("./comment.handler");

const comment = mockCommentsData(1);
const publication = mockPublication(1);

describe("addComment handlerbar", () => {
  const req = httpMock.createRequest({
    method: "POST",
    body: comment,
    params: {
      idPublication: 1,
    },
  });

  it("should work correctly", async () => {
    const mockModel = {
      findById: () =>
        Promise.resolve({
          comments: {
            create: (obj) => Promise.resolve(publication),
          },
        }),
    };
    const { res, next } = getResAndNext();
    await addCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(data).toStrictEqual(publication);
  });

  it("should not work correctly, Id Publication not valid", async () => {
    const mockModel = {
      findById: () => Promise.reject({ path: "_id" }),
    };
    const { res, next } = getResAndNext();
    await addCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(422);
    expect(data.id).toBe(1);
  });

  it("should not work correctly, Author not valid", async () => {
    const mockModel = {
      findById: () =>
        Promise.resolve({
          comments: {
            create: () => Promise.reject({ path: "author" }),
          },
        }),
    };
    const { res, next } = getResAndNext();
    await addCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(422);
    expect(data.id).toBe(1);
  });
});

describe("deleteDocument", () => {
  const idPub = "1";
  const idComment = "1";
  const req = httpMock.createRequest({
    method: "DELETE",
    url: "/api/publication/:idPublication/:idComment",
    params: {
      idPublication: idPub,
      idComment: idComment,
    },
  });

  it("should work correctly", async () => {
    publication.comments[0]._id = "1";
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          comments: {
            id: () => ({
              remove: () => comment,
            }),
          },
          save: () => publication,
        }),
    };
    await deleteCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(data).toStrictEqual(publication);
  });

  it("should not work correctly, IdPublication not valid", async () => {
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) => Promise.reject({ path: "_id" }),
    };
    await deleteCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(data.id).toBe(1);
    expect(res.statusCode).toBe(404);
    expect(data.message).toBe("Publication not exists");
  });

  it("should not work correctly, Comment Id not exists", async () => {
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          comments: {
            id: () => ({
              remove: () => null,
            }),
          },
        }),
    };
    await deleteCommentToPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Comment not exists");
  });
});

describe("updateComment", () => {
  const idComment = "1";
  const idPublication = "1";
  publication.comments.push(comment);
  const req = httpMock.createRequest({
    method: "PUT",
    url: "/api/publication/:idPublication/:idComment",
    body: comment,
    params: {
      idComment,
      idPublication,
    },
  });
  it("should work correctly", async () => {
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          comments: {
            id: (_id) => comment,
          },
          save: () => publication,
        }),
    };
    await updateCommentInPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(data).toStrictEqual(publication);
    expect(res.statusCode).toBe(200);
  });

  it("should not work, Id Publication not valid", async () => {
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) => Promise.reject({ path: "_id" }),
    };
    await updateCommentInPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Publication not exists");
  });

  it("should not work, Comment Id not valid", async () => {
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_ud) =>
        Promise.resolve({
          comments: {
            id: () => null,
          },
        }),
    };
    await updateCommentInPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Comment not exists");
  });

  it("should not work, Differents Author in comments", async () => {
    const newComment = mockCommentsData(2);
    const { res, next } = getResAndNext();
    const mockModel = {
      findById: (_id) =>
        Promise.resolve({
          comments: {
            id:()=>newComment,
          },
        }),
    };
    await updateCommentInPub(mockModel)(req, res, next);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.id).toBe(1);
    expect(data.message).toBe("Not allowed, Author differents")
  });
});

const getResAndNext = () => {
  const res = httpMock.createResponse();
  const next = ({ status, error }) => {
    res.status(status).json(error);
  };
  return { res, next };
};
