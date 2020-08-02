import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { FormContainer } from "./signin-form.styles";
import { Container, ButtonContainer, SignInTitle } from "../signup-form/signup-form.styles";
import CustomButton from "../custom-button/custom-button.component";
import CustomField from "../custom-inputfield/custom-inputfield.components";
import CustomCard from "../card/card.component.jsx";
import { login, toggleSignIn } from "../../redux/user/user.action";

export default function SignIn() {
  const [error, setError] = useState({ ok: false, msj:"" });
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  return (
    <Container onSubmit={handleSubmit(signInHandler(dispatch, setError))}>
      <SignInTitle> Sign In</SignInTitle>
      <FormContainer>
        <CustomCard width="600px" color="primary" warning={error.ok} msgWarning={error.msj}>
          <CustomField fowardRef={register} placeholder="Username or Email..." name="username" />
          <CustomField fowardRef={register} placeholder="Password..." type="password" name="password" />
        </CustomCard>
      </FormContainer>
      <ButtonContainer>
        <CustomButton type="submit" rounded={false}>
          SIGN IN
        </CustomButton>
           <CustomButton onClick={()=>dispatch(toggleSignIn())} type="button" color="dark2" rounded={false}>
          SIGN UP
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
}

const signInHandler = (dispatch, setError) => async data => {
  dispatch(login(data, setError));
};
