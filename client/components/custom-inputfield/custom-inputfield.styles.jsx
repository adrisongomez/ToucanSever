import styled from "styled-components";

export const CustomInputFieldContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.light};
  border-radius: 50px;
  padding: 10px 20px;
  margin: 10px;
  &:focus-within {
    -webkit-box-shadow: 0px 0px 15px 5px rgba(28, 10, 160, 0.3);
    box-shadow: 0px 0px 15px 5px rgba(28, 10, 160, 0.3);
  }
`;

export const CustomInputText = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const CustomInputLabel = styled.label``;

//   -webkit-box-shadow: 0px 0px 32px -1px rgba(0, 0, 0, 0.42);
//   box-shadow: 0px 0px 32px -1px rgba(0, 0, 0, 0.42);
