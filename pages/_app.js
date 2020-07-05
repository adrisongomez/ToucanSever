import App from "next";
import { ThemeProvider } from "styled-components";
import LightTheme from "../client/theme/light";
import DarkTheme from "../client/theme/Dark";

export default class MyApp extends App {
  constructor() {
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
      </ThemeProvider>
    );
  }
}
