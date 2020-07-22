import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, onClick, txtColor = "light", color = "primary", rounded = true, ...otherProps }) => (
  <CustomButtonContainer {...{ onClick, txtColor, color, rounded }} {...otherProps}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
