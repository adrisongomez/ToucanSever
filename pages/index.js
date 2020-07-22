import React from "react";
import HeaderPublic from "../client/components/header-public/header-public.component";
import LandingPage from "../client/components/lading-page/lading-page.component";
import Footer from "../client/components/footer/footer.component";

const IndexPage = () => {
  return (
    <div>
      <HeaderPublic />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default IndexPage;
