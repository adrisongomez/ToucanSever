import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({style, children, onClick, txtColor = "light", color = "primary", rounded = true, ...otherProps }) => (
  <CustomButtonContainer style={style} {...{ onClick, txtColor, color, rounded }} {...otherProps}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
