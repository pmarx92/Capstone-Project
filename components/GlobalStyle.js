import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
          --text-primary: #0c2c4d;
          --background-primary: #edf0f5;
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
