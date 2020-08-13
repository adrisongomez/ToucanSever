import React from "react";
import { useRouter } from "next/router";
import CustomButton from "../custom-button/custom-button.component";
import { HeaderContainer, Logo, Nav, LinkNav, Options, ButtonsContainer, Or } from "./header-public.styles";
import { ReactComponent as GoogleSVG } from "../../assets/google_logo.svg";

const googleHandler = (router, href) => event => {
  event.preventDefault();
  router.push(href);
};

export default function HeaderPublic() {
  const router = useRouter();

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
          <CustomButton onClick={googleHandler(router, "/api/auth/provider/google")} color="light" style={googleButtomStyle}>
            <GoogleSVG height="20px" />
          </CustomButton>
        </ButtonsContainer>
      </Nav>
    </HeaderContainer>
  );
}

const googleButtomStyle = {
  padding: "5px 20px"
};
