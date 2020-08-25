import styled, { css } from "styled-components";

const cssRow = css`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const SignUpContainer = styled.form`
  width: 1000px;
  height: 100%;
  margin: auto;
  padding: 5vh 5vw;
  background-color: ${({ theme }) => theme.light2};
  border-radius: 25px;
`;
export const Row = styled.div`
   ${cssRow}
`;

export const ButtonRow = styled.div`
   ${cssRow}
   padding: 10px;
`;

export const Title = styled.div`
   font-size: 25pt;
   font-weight: bold;
`
