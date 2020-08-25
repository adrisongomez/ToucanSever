import React, { useReducer } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import CustomInput from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";

import { SignUpContainer, Row, ButtonRow, Title } from "./signup-page-form.styles";

const standarizeObject = ({ given_name, family_name, picture, ...otherAttr }) => ({
  firstName: given_name || otherAttr.firstName,
  lastName: family_name || otherAttr.lastName,
  ...otherAttr,
});

const SignUpPageForm = () => {
  const router = useRouter();
  let data;
  if(router.query.data) data = standarizeObject(JSON.parse(router.query.data));
  else data = {};
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  return (
    <SignUpContainer>
      <Row>
        <Title>Register</Title>
      </Row>
      <Row>
         <CustomInput name="firstName" placeholder="First Name..." fowardRef={register} disabled={(data.firstName !== undefined) ? true : false} />
        <CustomInput name="lastName" placeholder="Last Name..." fowardRef={register}  disabled={(data.lastName !== undefined) ? true : false}/>
      </Row>
      <Row>
        <CustomInput name="email" placeholder="Email..." fowardRef={register} disabled={(data.email !== undefined) ? true : false}/>
      </Row>
      <Row>
        <CustomInput name="country" placeholder="Country..." fowardRef={register} disabled={(data.country !== undefined) ? true : false}/>
      </Row>
      <Row>
        <CustomInput name="state" placeholder="State Province or City..." fowardRef={register} />
        <CustomInput name="zipCode" placeholder="Zip Code..." fowardRef={register} />
      </Row>
      <ButtonRow>
        <CustomButton>Submit Register</CustomButton>
        <CustomButton
          style={{
            margin: "0 0 0 10px",
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
