import React from "react";
import { CustomInputFieldContainer, CustomInputLabel, CustomInputText } from "./custom-inputfield.styles";

const CustomInputField = ({ onChange, value, placeholder = "Write here...", type = "text", label, name, fowardRef }) => (
  <CustomInputFieldContainer>
    <CustomInputText {...{ onChange, value, placeholder, type, name, ref: fowardRef }} />
  </CustomInputFieldContainer>
);

export default CustomInputField;
