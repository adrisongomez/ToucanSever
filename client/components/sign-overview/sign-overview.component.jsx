import React from "react";
import { useSelector } from "react-redux";

import SignIn from "../signin-form/signin-form.component";
import SignUp from "../signup-form/signup-form.components";
import { selectSignIn } from "../../redux/user/user.select";

const SignOverview = () => {
  const signIn = useSelector(selectSignIn);
  return signIn ? <SignIn /> : <SignUp />;
};

export default SignOverview;
