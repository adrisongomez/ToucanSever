import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  min-width: 100vw;
  place-content: center center;
  padding: 40px 5vw 20px;
  background-color: ${({ theme }) => theme.light2};
  position: relative;
  bottom: 0;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  &::last-child {
    margin-right: 0;
  }
`;

export const Column = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0 10vw;
`;

export const FooterOption = styled.a`
  font-style: italic;
  text-decoration: none;
  cursor: pointer;
  color: ${(theme) => theme.dark2};
  padding: 5px 0;
`;

export const CopySign = styled.h3`
  margin-top: 40px;
  text-align: center;
`;

export const Title = styled.h3`
  margin-bottom: 5px;
`;
