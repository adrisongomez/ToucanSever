import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body, html{
        min-width: 100vw;
        min-height: 100vh;
    }
    
    *{
        font-family: 'Montserrat', sans-serif;
        box-sizing:border-box;
        margin: 0;
        padding: 0;
    }
`;
