import styled, { keyframes } from "styled-components";

export const CardContainer = styled.div`
  background: ${pickWarningColor};
  -webkit-box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
  border-radius: ${({ theme }) => theme.borderRadiusContainer};
  overflow: hidden;
  margin: 20px;
`;

export const ContentContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadiusContainer};
  background: ${({ theme, color }) => theme[color]};
  padding: 20px;
`;

export const WarningContainer = styled.div`
  display: ${({ warning }) => (warning ? "flex" : "none")};
  background: ${pickWarningColor};
  padding: ${({ warning }) => (warning ? "10px" : "0")};
  color: white;
`;

function pickWarningColor({ warning, colorWarning }) {
  return warning ? colorWarning : null;
}
