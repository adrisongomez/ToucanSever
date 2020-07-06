import React from "react";
import CustomButton from "../client/components/custom-button/custom-button.component";

const IndexPage = () => (
  <div>
    <CustomButton>Button</CustomButton>
    <CustomButton rounded={false}>Button</CustomButton>
    <CustomButton color="secondary">Button</CustomButton>
  </div>
);

export default IndexPage;
