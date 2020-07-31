import App from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { createWrapper } from "next-redux-wrapper";

import LightTheme from "../client/theme/light";
import DarkTheme from "../client/theme/dart";
import { GlobalStyle } from "../client/global.style";
import store from "../client/redux/store";

class MyApp extends App {
  constructor() {
    super();
    this.state = {
      theme: LightTheme
    };
  }

  setTheme = options => {
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
      <Provider store={store}>
        <ThemeProvider theme={this.state.theme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </Provider>
    );
  }
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
