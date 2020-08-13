import App from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { createWrapper } from "next-redux-wrapper";

import LightTheme from "../client/theme/light";
import DarkTheme from "../client/theme/dart";
import { GlobalStyle } from "../client/global.style";
import store from "../client/redux/store";

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState(LightTheme);

  const changeTheme = options => {
    switch (options) {
      case "light":
        return setTheme({ theme: LightTheme });
      case "dark":
        return setTheme({ theme: DarkTheme });
      default:
        return setTheme({ LightTheme });
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

MyApp.getInitialProps = async appCtx => {
 const appProps = await App.getInitialProps(appCtx);
 return appProps;
};

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
