import React from "react";
import { ContentContainer, CardContainer, WarningContainer } from "./card.styles";

const duration = 500;

const Card = ({ color = "light", children, warning = false, msgWarning = null, colorWarning = "tomato" }) => {
  return (
    <CardContainer {...{ warning, colorWarning }}>
      <WarningContainer warning={warning}>{msgWarning}</WarningContainer>
      <ContentContainer {...{ color }}>{children}</ContentContainer>
    </CardContainer>
  );
};

export default Card;
