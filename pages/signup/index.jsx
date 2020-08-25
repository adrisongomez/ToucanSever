import React from "react";
import Head from "next/head";

import MainContainer from "../../client/components/main-container/main-container.components";
import SignUpPageForm from "../../client/components/signup-page-form/signup-page-form.component";

const SignUpPage = () => (
  <MainContainer>
    <Head>
      <title>Toucan - Sign Up</title>
    </Head>
    <SignUpPageForm />
  </MainContainer>
);

export default SignUpPage;
