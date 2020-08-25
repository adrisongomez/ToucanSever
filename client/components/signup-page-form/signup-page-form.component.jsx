import React, { useReducer } from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";

import { SignUpContainer, Row, ButtonRow, Title } from "./signup-page-form.styles";

const SignUpPageForm = ({ data }) => {
  const { register, handleSubmit } = useForm();
  return (
    <SignUpContainer>
      <Row>
        <Title>Register</Title>
      </Row>
      <Row>
        <CustomInput name="firstName" placeholder="First Name..." fowardRef={register} />
        <CustomInput name="lastName" placeholder="Last Name..." fowardRef={register} />
      </Row>
      <Row>
        <CustomInput name="email" placeholder="Email..." fowardRef={register} />
      </Row>
      <Row>
        <CustomInput name="country" placeholder="Country..." fowardRef={register} />
      </Row>
      <Row>
        <CustomInput name="state" placeholder="State or Province..." fowardRef={register} />
        <CustomInput name="city" placeholder="City..." fowardRef={register} />
        <CustomInput name="zipCode" placeholder="Zip Code..." fowardRef={register} />
      </Row>
      <ButtonRow>
        <CustomButton>Submit Register</CustomButton>
        <CustomButton
          style={{
            margin: "0 0 0 10px"
          }}
          color="warning"
        >
          Cancel
        </CustomButton>
      </ButtonRow>
    </SignUpContainer>
  );
};

export default SignUpPageForm;
