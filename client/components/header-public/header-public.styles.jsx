import styled, { css } from "styled-components";
import Link from "next/link";

const RowFlex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const HeaderContainer = styled.div`
  ${RowFlex}
  width: 100vw;
  background-color: ${({ theme }) => theme.light2};
  justify-content: space-between;
  padding: 10px 5vw;
`;

export const Options = styled.div`
  ${RowFlex}
  border-right: 2px solid ${({ theme }) => theme.dark2}; 
`;

export const Nav = styled.nav`
  ${RowFlex}
`;

export const ButtonsContainer = styled.div`
  ${RowFlex}
  margin-left: 2vw;
`;

export const LinkNav = styled.a`
  font-size: 14px;
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.dark2};
  padding: 5px 2vw;
  cursor: pointer;
`;

export const Logo = styled.div`
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.light};
  background-color: ${({ theme }) => theme.dark2};
  padding: 5px 20px;
  border-radius: 30px;
`;

export const Or = styled.p`
  font-size: 14px;
  padding: 0 10px;
`;
