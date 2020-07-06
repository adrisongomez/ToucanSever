import App from "next/app";
import { ThemeProvider } from "styled-components";
import LightTheme from "../client/theme/light";
import DarkTheme from "../client/theme/dart";
import { GlobalStyle } from "../client/global.style";

export default class MyApp extends App {
  constructor() {
    super();
    this.state = {
      theme: LightTheme,
    };
  }

  setTheme = (options) => {
    switch (options) {
      case "light":
        return this.setTheme({ theme: LightTheme });
      case "dark":
        return this.setTheme({ theme: DarkTheme });
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={this.state.theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    );
  }
}
