import React from "react";
import Head from 'next/head';
import HeaderPublic from "../client/components/header-public/header-public.component";
import LandingPage from "../client/components/lading-page/lading-page.component";
import Footer from "../client/components/footer/footer.component";

const IndexPage = () => {
  return (
      <div style={{
          width: "100%",
          height: "70vh",
      }}>
         <Head> 
            <title>Toucan - Welcome Page </title>
            </Head>
      <HeaderPublic />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default IndexPage;
