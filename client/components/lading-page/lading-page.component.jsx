import React from "react";
import { useForm } from "react-hook-form";
import { Container, FormContainer, FullName, Region, LandingContainer, Title, Subtitle, SignInTitle, ButtonContainer } from "./lading-page.styles";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";

const submitHandle = data => {
  console.log(data);
};

export default function() {
  const { register, handleSubmit } = useForm();
  return (
    <LandingContainer>
      <div>
        <Subtitle>Share yours</Subtitle>
        <Title>Expirence</Title>
      </div>
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
    </LandingContainer>
  );
}
