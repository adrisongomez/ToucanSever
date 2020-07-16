import React, { useState } from "react";
import { Transition } from "react-transition-group";
import Card from "../client/components/card/card.component";
import CustomButton from "../client/components/custom-button/custom-button.component";

const duration = 500;
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  existing: { opacity: 0 },
  exited: { opacity: 0 },
};
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const IndexPage = () => {
  const [warning, setWarning] = useState(false);
  const message = (
    <p>
      This is the warning message{" "}
      <a href="#" style={{ color: "white" }}>
        Try it again.
      </a>
    </p>
  );
  return (
    <div>
      <Card>Without Warning</Card>
      <Card color="light2">Another color</Card>
      <Card warning msgWarning={message}>
        With Warning
      </Card>
      <Card warning={warning} msgWarning={message} colorWarning="green">
        With custom color Warning
      </Card>
      <CustomButton color="secondary" onClick={() => setWarning(!warning)}>
        Toggle Warning
      </CustomButton>
      <Transition in={warning} timeout={duration}>
        {(state) => <div style={{ ...defaultStyle, ...transitionStyles[state] }}> I am a fade transition!.</div>}
      </Transition>
    </div>
  );
};

export default IndexPage;
