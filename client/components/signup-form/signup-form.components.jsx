import React from "react";
import { useForm } from "react-hook-form";
import { Container, FullName, FormContainer, Region, ButtonContainer, SignInTitle } from "./signup-form.styles";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";
import http from "../../utils/http.utils";

const submitHandle = async data => {
  try {
    const { postData } = http(axios);
    return await postData("/api/user", data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default function SignUpLanding() {
  const { register, handleSubmit } = useForm();
  return (
    <Container onSubmit={handleSubmit(submitHandle)}>
      <SignInTitle>Sign Up</SignInTitle>
      <FormContainer>
        <FullName>
          <CustomField fowardRef={register} name="firstname" placeholder="First Name" />
          <CustomField fowardRef={register} name="lastname" placeholder="Last Name" />
        </FullName>
        <CustomField fowardRef={register} name="email" placeholder="Email" type="email" />
        <Region>
          <CustomField fowardRef={register} name="country" placeholder="City, Province or State" />
          <CustomField fowardRef={register} name="country" placeholder="Country" />
        </Region>
      </FormContainer>
      <ButtonContainer>
        <CustomButton type="submit" rounded={false} color="dark2">
          SIGN UP
        </CustomButton>
        <CustomButton type="button" rounded={false}>
          SIGN IN
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
}
