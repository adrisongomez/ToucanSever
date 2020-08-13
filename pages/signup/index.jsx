import React from "react";

import MainContainer from "../../client/components/main-container/main-container.components";
import SignUpPageForm from "../../client/components/signup-page-form/signup-page-form.component";

const SignUpPage = ({ data }) => {
  return (
    <MainContainer>
      <SignUpPageForm {...{ data }} />
    </MainContainer>
  );
};

SignUpPage.getInitialProps = async ctx => {
  const { req } = ctx;
  if (req.query.data === undefined) return { data: null };
  const data = JSON.parse(req.query.data);
  return { data };
};

export default SignUpPage;
