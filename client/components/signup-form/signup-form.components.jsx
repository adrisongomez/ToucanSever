import React from "react";
import { useForm } from "react-hook-form";
import { Container, FullName, FormContainer, Region, ButtonContainer, SignInTitle } from "./signup-form.styles";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { toggleSignIn } from "../../redux/user/user.action";

const submitHandle = async data => {
   console.log("is Working");
};

export default function SignUpLanding() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
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
        <CustomButton onClick={() => dispatch(toggleSignIn())} type="button" rounded={false}>
          SIGN IN
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
}
