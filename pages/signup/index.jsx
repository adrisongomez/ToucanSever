import React from "react";

import MainContainer from "../../client/components/main-container/main-container.components";
import SignUpPageForm from "../../client/components/signup-page-form/signup-page-form.component";

const SignUpPage = ({ data }) => (
  <MainContainer>
    <SignUpPageForm {...{ data }} />
  </MainContainer>
);

SignUpPage.getInitialProps = async (ctx) => {
  const { req } = ctx;
  if (req.query === undefined) return { data: null };
  if ("data" in req.query) return { data: null };
  const data = JSON.parse("data" in req.query);
  return { data };
};

export default SignUpPage;
