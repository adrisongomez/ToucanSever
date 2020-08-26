import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { initialRegisterRegister } from "../../redux/register/register.action";
import CustomInput from "../custom-inputfield/custom-inputfield.components";
import CustomButton from "../custom-button/custom-button.component";
import SignUpPersonalInfo from './signup-parts/part-1';

import { SignUpContainer, Row, ButtonRow, Title } from "./signup-page-form.styles";

const standarizeObject = ({ given_name, family_name, picture, ...otherAttr }) => ({
  firstName: given_name || otherAttr.firstName,
  lastName: family_name || otherAttr.lastName,
  ...otherAttr,
});

const getRegisterPart = (part) => {
   switch(part){
      case 1:
         return SignUpPageForm;

      default:
         return SignUpPageForm;
   }
}

const SignUpPageForm = () => {
  const [position, setPostion] = useState(1);
  const router = useRouter();
  let data;
  if (router.query.data) data = standarizeObject(JSON.parse(router.query.data));
  else data = {};
  const CurrentPart = getRegisterPart(position);
  return (
    <SignUpContainer>
      <CurrentPart />    
    </SignUpContainer>
  );
};

export default SignUpPageForm;
