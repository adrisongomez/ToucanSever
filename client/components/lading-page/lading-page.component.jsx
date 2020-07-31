import React from "react";
import { LandingContainer, Title, Subtitle } from "./lading-page.styles";
import SignIn from '../signin-form/signin-form.component';
// import SignUpForm from "../signup-form/signup-form.components";

export default function LandingPage() {
  return (
    <LandingContainer>
      <div>
        <Subtitle>Share yours</Subtitle>
        <Title>Expirence</Title>
      </div>
      <SignIn />
    </LandingContainer>
  );
}

//      <SignUpForm />
