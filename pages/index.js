import React from "react";
import styled from "styled-components";

const Test = styled.h1`
  color: red;
`;
const IndexPage = () => (
  <div>
    <Test> It's working with nodemon </Test>
  </div>
);

export default IndexPage;
