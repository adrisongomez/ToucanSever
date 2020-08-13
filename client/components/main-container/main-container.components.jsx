import React from "react";

import HeaderPreview from "../header-preview/header-preview.component";
import Footer from "../footer/footer.component";
import { Main, Content } from "./main-container.styles";

export default function MainContainer({ children }) {
  return (
    <Main>
      <HeaderPreview isPublic />
      <Content>{children}</Content>
      <Footer />
    </Main>
  );
}
