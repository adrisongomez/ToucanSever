import styled from "styled-components";
import Portrait from "../../assets/trip-photo.jpg";

export const LandingContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-image: url(${Portrait});
  background-size: cover;
  background-position: center;
  background-repeat: not-repeat;
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


