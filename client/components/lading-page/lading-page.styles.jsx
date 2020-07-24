import styled from "styled-components";
import Portrait from "../../assets/trip-photo.jpg";

export const LandingContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: red;
  background-image: url(${Portrait});
  background-size: cover;
  background-position: center;
  background-repeat: not-repeat;
`;

export const Container = styled.form`
  width: 350px;
  height: fit-content;
  text-align: center;
  background-color: ${({ theme }) => theme.light2};
  border-radius: ${({ theme }) => theme.borderRadiusContainer};
  padding: 10px;
`;

export const FormContainer = styled.div`
  position: relative;
  right: 40%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 10px 0 20px;
  width: 600px;
  padding: 30px;
  border-radius: ${({ theme }) => theme.borderRadiusContainer};
  background-color: ${({ theme }) => theme.primary};
`;

export const FullName = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Region = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
`;
export const Subtitle = styled.p`
  font-size: 50px;
  margin-bottom: 0px;
  color: white;
`;

export const Title = styled.p`
  font-size: 85px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
`;

export const SignInTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark};
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 10px 20px;
  grid-template-columns: 1fr 1fr;
`;
