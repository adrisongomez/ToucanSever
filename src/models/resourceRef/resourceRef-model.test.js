const { model, Schema } = require("mongoose");

const ResourceRef = require("./resourceRef.schema");

const Parent = model(
  "parent",
  Schema({
    resourceRefs: [ResourceRef],
  })
);

const {
  connect,
  closeDatabase,
  dropDatabase,
} = require("../../__mocks__/db.testHelper");
const { mockResourceRef } = require("../../__mocks__/utils.testHelper");

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await dropDatabase();
  await closeDatabase();
});

afterEach(async () => {
  await dropDatabase();
});

const getStuff = async () => {
  const resourceRef = mockResourceRef();
  const parent = await Parent.create({});
  const resourceRefs = parent.resourceRefs;
  const resource = resourceRefs.create(mockResourceRef());
  resourceRefs.push(resource);
  await resource.parent().save();
  return { resourceRef, parent, resourceRefs };
};

describe("ResourceRef SubDocument create", () => {
  it("should work correctly", async () => {
    const { resourceRef, parent } = await getStuff();
    parent.resourceRefs.push(resourceRef);
    await parent.save();
    expect(parent.resourceRefs[1].parentId).toBe(resourceRef.parentId);
    expect(parent.resourceRefs[1].resourceId).toBe(resourceRef.resourceId);
    expect(parent.resourceRefs[1].albumId).toBe(resourceRef.albumId);
  });

  it("should not work correctly", async () => {
    const { resourceRefs } = await getStuff();
    const newR = resourceRefs.create({});
    resourceRefs.addToSet(newR);
    try {
      await newR.parent().save();
    } catch (error) {
      let err = {};
      for (const key in error.errors) {
        if (key.includes(".parentId")) err.parentId = true;
        if (key.includes(".resourceId")) err.resourceId = true;
        if (key.includes(".resourceId")) err.albumId = true;
      }
      expect(err.parentId).toBeTruthy();
      expect(err.resourceId).toBeTruthy();
      expect(err.albumId).toBeTruthy();
    }
  });
});

describe("ResourceRef SubDocument find", () => {
  it("should work correctly", async () => {
    const { resourceRefs } = await getStuff();
    const resourceRef = resourceRefs[0];
    const result = resourceRefs.id(resourceRef);
    expect(result).toBeDefined();
    expect(resourceRefs).toContain(result);
  });

  it("should not wrok correctly", async () => {
    const { resourceRefs } = await getStuff();
    const result = resourceRefs.id(123);
    expect(result).toBeNull();
  });
});

describe("ResourceRef SubDocument delete", () => {
  it("should work correctly", async () => {
    const { resourceRefs } = await getStuff();
    const result = resourceRefs.id(resourceRefs[0]._id).remove();
    await result.parent().save();
    expect(result).toBeDefined();
    expect(resourceRefs).not.toContain(result);
  });

  it("should not work correctly, ResourceRef id not exists", async () => {
    const { resourceRefs } = await getStuff();
    try {
      resourceRefs.id(123).remove();
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});

describe("ResourceRef SubDocument update", () => {
  it("should work correctly", async () => {
    const { resourceRefs, resourceRef } = await getStuff();
    const resourceRefToUpdate = resourceRefs[0];
    const resource = resourceRefs.id(resourceRefToUpdate._id);
    resource.albumId = resourceRef.albumId;
    resource.resourceId = resourceRef.resourceId;
    resource.parentId = resourceRef.parentId;
    await resource.parent().save();
    expect(resourceRefToUpdate).toBe(resource);
  });

  it("should not work correctly, bad data", async () => {
    const { resourceRefs, resourceRef } = await getStuff();
    const resourceRefToUpdate = resourceRefs[0];
    const resource = resourceRefs.id(resourceRefToUpdate._id);
    resource.albumId = null;
    resource.resourceId = null;
    resource.parentId = null;
    try {
      await resource.parent().save();
    } catch (error) {
      let err = {};
      for (const key in error.errors) {
        if (key.includes(".parentId")) err.parentId = true;
        if (key.includes(".resourceId")) err.resourceId = true;
        if (key.includes(".resourceId")) err.albumId = true;
      }
      expect(err.parentId).toBeTruthy();
      expect(err.resourceId).toBeTruthy();
      expect(err.albumId).toBeTruthy();
    }
  });
});
