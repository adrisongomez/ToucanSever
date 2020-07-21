import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, onClick, color = "primary", rounded = true, ...otherProps }) => (
  <CustomButtonContainer {...{ onClick, color, rounded }} {...otherProps}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
