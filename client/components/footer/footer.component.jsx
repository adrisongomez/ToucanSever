import React from "react";
import Link from "next/link";
import { FooterContainer, FooterContent, Column, FooterOption, CopySign, Title } from "./footer.styles";
export default function() {
  return (
    <FooterContainer>
      <FooterContent>
        <Column>
          <Title>Our services for</Title>
          <Link href="#">
            <FooterOption>For Business</FooterOption>
          </Link>
          <Link href="#">
            <FooterOption>For Trip Lovers</FooterOption>
          </Link>
        </Column>
        <Column>
          <Title>Resources</Title>
          <Link href="#">
            <FooterOption>Term of Service</FooterOption>
          </Link>
          <Link href="#">
            <FooterOption>Documentacion</FooterOption>
          </Link>
          <Link href="#">
            <FooterOption>API</FooterOption>
          </Link>
        </Column>
        <Column>
          <Link href="#">
            <Title style={{ cursor: "pointer" }}>Sign In</Title>
          </Link>
          <Link href="#">
            <Title style={{ cursor: "pointer" }}>Sign Up</Title>
          </Link>
          <Link href="#">
            <Title style={{ cursor: "pointer" }}>Contact Us</Title>
          </Link>
        </Column>
      </FooterContent>
      <CopySign>Adrison Gomez &copy; 2020</CopySign>
    </FooterContainer>
  );
}
