import React from "react";
import Head from "next/head";
import MainContainer from "../client/components/main-container/main-container.components";
import LandingPage from "../client/components/lading-page/lading-page.component";

const IndexPage = () => {
  return (
    <MainContainer>
        <Head>
          <title>Toucan - Welcome Page </title>
        </Head>
        <LandingPage />
    </MainContainer>
  );
};

export default IndexPage;
