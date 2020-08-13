import React, {useReducer} from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";

import {} from "./signup-page-form.styles";

const SignUpPageForm = ({ data }) => {
   
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <div>
        <CustomInput name="firstName" value={data.given_name} placeholder="First Name..." fowardRef={register} />
        <CustomInput name="lastName" placeholder="Last Name..." fowardRef={register} />
      </div>
      <div>
        <CustomButton>Submit Register</CustomButton>
        <CustomButton color="warning"> Cancel </CustomButton>
      </div>
    </div>
  );
};

export default SignUpPageForm;
