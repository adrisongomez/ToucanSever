import React from "react";
import { CustomInputFieldContainer, CustomInputLabel, CustomInputText } from "./custom-inputfield.styles";

const CustomInputField = ({ ref, onChange, value, placeholder = "Write here...", type = "text", label, name }) => (
  <CustomInputFieldContainer>
    <CustomInputText {...{ onChange, ref, value, placeholder, type, name }} />
  </CustomInputFieldContainer>
);

export default CustomInputField;
