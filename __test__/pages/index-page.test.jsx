import React from "react";

import { shallow } from "enzyme";
import Index from "../../pages/index.js";

describe("Index Page work correct", () => {
  it("Index it should shallow", () => {
    expect(shallow(<Index />));
  });
});
