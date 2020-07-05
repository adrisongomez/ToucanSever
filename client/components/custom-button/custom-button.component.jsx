import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, onClick, color = "primary", rounded = true }) => <CustomButtonContainer {...{ onClick, color, rounded }}>{children}</CustomButtonContainer>;

export default CustomButton;
