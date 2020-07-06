import React from "react";
import {} from "./custom-inputfield.styles";

const CustomInputField = ({ onChange, value, placeholder = "Write here...", type = "text", label, name }) => (
  <div>
    <label for={name}>{label}</label>
    <input {...{ onChange, value, placeholder, type, name }} />
  </div>
);

export default CustomInputField;
