import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
          --text-primary: #011F26;
          --text-on-color: #FFFFFF;
          --backgroundColor-green: #4B7322;
          --backgroundColor-dark: #011F26;

      }
  
      * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
      }
  
      body {
          font-family: 'Noto Sans', sans-serif;
          background-color: var(--background-primary);
          color: var(--text-primary);
          margin-bottom: 5rem;
      }
  `;

export default GlobalStyle;
