import React from 'react';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { initialRegisterRegister } from "../../../redux/register/register.action";
import CustomInput from "../../custom-inputfield/custom-inputfield.components";
import CustomButton from "../../custom-button/custom-button.component";

import { SignUpContainer, Row, ButtonRow, Title } from "../signup-page-form.styles";

const standarizeObject = ({ given_name, family_name, picture, ...otherAttr }) => ({
  firstName: given_name || otherAttr.firstName,
  lastName: family_name || otherAttr.lastName,
  ...otherAttr,
});

const SignUpPersonalInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let data;
  if (router.query.data) data = standarizeObject(JSON.parse(router.query.data));
  else data = {};
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  return (
    <SignUpContainer onSubmit={handleSubmit(handleSubmitRegister(dispatch))}>
      <Row>
        <Title>Register</Title>
      </Row>
      <Row>
        <CustomInput name="firstName" placeholder="First Name..." fowardRef={register} disabled={data.firstName !== "" ? true : false} />
        <CustomInput name="lastName" placeholder="Last Name..." fowardRef={register} disabled={data.lastName !== "" ? true : false} />
      </Row>
      <Row>
        <CustomInput name="email" placeholder="Email..." fowardRef={register} disabled={data.email !== '' ? true : false} />
      </Row>
      <Row>
        <CustomInput name="country" placeholder="Country..." fowardRef={register} disabled={data.country !== '' ? true : false} />
      </Row>
      <Row>
        <CustomInput name="state" placeholder="State Province or City..." fowardRef={register} />
        <CustomInput name="zipCode" placeholder="Zip Code..." fowardRef={register} />
      </Row>
      <Row>
        <CustomButton>Submit Register</CustomButton>
        <CustomButton
          style={{
            margin: "0 0 0 10px",
          }}
          color="warning"
        >
          Cancel
        </CustomButton>
      </Row>
    </SignUpContainer>
  );
};

export default SignUpPersonalInfo;
