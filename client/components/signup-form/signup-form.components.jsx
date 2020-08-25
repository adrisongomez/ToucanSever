import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Container, FullName, FormContainer, Region, ButtonContainer, SignInTitle } from "./signup-form.styles";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";
import { toggleSignIn } from "../../redux/user/user.action";

const handlerRouter = (href, data = {}) => {
  console.log(data);
  Router.push({ pathname: href, query: { data: JSON.stringify(data) } });
};

const submitHandle = router => data => {
  handlerRouter("/signup", data);
};

export default function SignUpLanding() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Container onSubmit={handleSubmit(submitHandle(router))}>
      <SignInTitle>Sign Up</SignInTitle>
      <FormContainer>
        <FullName>
          <CustomField fowardRef={register} name="firstName" placeholder="First Name" />
          <CustomField fowardRef={register} name="lastName" placeholder="Last Name" />
        </FullName>
        <CustomField fowardRef={register} name="email" placeholder="Email" type="email" />
        <Region>
          <CustomField fowardRef={register} name="state" placeholder="City, Province or State" />
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
