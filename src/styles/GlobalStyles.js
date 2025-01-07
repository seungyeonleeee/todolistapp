import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}

  /* fonts */
  @font-face {
    font-family: "GmarketSans";
    src: url("/fonts/GmarketSansTTFMedium.ttf") format("truetype");
  }
  @font-face {
    font-family: "Montserrat";
    src: url("/fonts/Montserrat-Bold.ttf") format("truetype");
  }

  /* reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input {
    background: transparent;
    border: none;
    &::placeholder {
      opacity: 1;
      transition: opacity 0.3s;
    }
    &:focus{
      outline: none;
      &::placeholder {
        opacity: 0;
      }
    }
  }
  button{
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  /* common */
  body{ 
    font-family: "GmarketSans";
  }
`;
