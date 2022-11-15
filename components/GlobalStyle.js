import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
          --text-primary: #011F26;
          --text-on-color: #FFFFFF;
          --backgroundColor-green: #4B7322;
          --backgroundColor-dark: #011F26;
          --white: #fff;
      }
  
      * {
      font-family: 'Inter';
         box-sizing: border-box;
         padding: 0;
         margin: 0;
        }
        
        body {
          color: var(--text-primary);
          margin-bottom: 20rem;
      }
  `;

export default GlobalStyle;
