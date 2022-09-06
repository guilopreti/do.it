import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    :root{
        --white: #f5f5f5;
        --vanilla: #f1ede8;
        --black:#0c0d0d;
        --orange: #c85311;
        --grey: #666360;
        --red: #c53030;
    }

    body{
        background: var(--vanilla);
        color: var(--black);
    }

    body, input,button{
        font-size: 1rem;
        font-family: 'PT Serif', serif;
    }
    h1,h2,h3,h4,h5,h6{
        font-weight: 700;
        font-family: 'Roboto Mono', monospace;
    }

    button{
        cursor: pointer
    }

    a{
        text-decoration: none;
    }
`;

export default GlobalStyle;
