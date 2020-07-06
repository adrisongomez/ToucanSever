import React, { useState } from "react";
import CustomInputField from "../client/components/custom-inputfield/custom-inputfield.components";

const IndexPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUsername = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setUsername(value);
  };
  return (
    <div>
      <CustomInputField type="text" name="username" placeholder="Enter username" label="Username" value={username} onChange={onChangeUsername} />
      <CustomInputField
        type="password"
        label="Password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => {
          e.preventDefault();
          const value = e.target.value;
          setPassword(value);
        }}
      />
    </div>
  );
};

export default IndexPage;
