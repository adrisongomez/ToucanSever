import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import { HeaderContainer, Logo, Nav, LinkNav, Options, ButtonsContainer, Or } from "./header-public.styles";
import { ReactComponent as GoogleSVG } from "../../assets/google_logo.svg";

const googleHandler = event => {
  event.preventDefault();
  const windows = window.open("/api/auth/provider/google/", "name", "height=600,width=450");
  setInterval(() => {
    console.log(windows.document.body.innerText.toString());
  }, 2500);
};

export default function HeaderPublic() {
  return (
    <HeaderContainer>
      <Logo>TOUCAN</Logo>
      <Nav>
        <Options>
          <LinkNav href="/about/business">For Business</LinkNav>
          <LinkNav href="/about/triplovers">For triplovers</LinkNav>
        </Options>
        <ButtonsContainer>
          <CustomButton style={{ color: "white", padding: "5px 20px" }}>SIGN IN</CustomButton>
          <Or>Or</Or>
          <CustomButton color="light" style={googleButtomStyle}>
            <LinkNav href="/api/auth/provider/google/">
              <GoogleSVG height="20px" />{" "}
            </LinkNav>
          </CustomButton>
        </ButtonsContainer>
      </Nav>
    </HeaderContainer>
  );
}

const googleButtomStyle = {
  padding: "5px 20px"
};
