import React from "react";
import { LandingContainer, Title, Subtitle } from "./lading-page.styles";
import OverViewForm from '../sign-overview/sign-overview.component';

export default function LandingPage() {
  return (
    <LandingContainer>
      <div>
        <Subtitle>Share yours</Subtitle>
        <Title>Expirence</Title>
      </div>
      <OverViewForm />
    </LandingContainer>
  );
}
