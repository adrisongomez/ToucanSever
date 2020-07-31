import React from "react";
import { useForm } from "react-hook-form";

import { Container, FormContainer, ButtonContainer, SignInTitle } from "../signup-form/signup-form.styles";
import CustomButton from "../custom-button/custom-button.component";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import AuthService from "../../services/user.service";

const service = new AuthService();

const signInHandler = data => {
  const { username } = data;
  service.login(data);
  console.log(username);
  return false;
};

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  return (
    <Container onSubmit={handleSubmit(signInHandler)}>
      <SignInTitle> Sign In Form</SignInTitle>
      <FormContainer>
        <CustomField fowardRef={register} placeholder="Username or Email..." name="username" />
        <CustomField fowardRef={register} placeholder="Password..." type="password" name="password" />
      </FormContainer>
      <ButtonContainer>
        <CustomButton type="submit" rounded={false}>
          Sign In
        </CustomButton>
        <CustomButton type="button" color="dark2" rounded={false}>
          Sign Up
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
}
