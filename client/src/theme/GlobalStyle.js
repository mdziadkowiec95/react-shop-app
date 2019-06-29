import { createGlobalStyle } from 'styled-components';
import { theme } from 'theme/mainTheme';

const GlobalStyle = createGlobalStyle` 
  /* @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600&display=swap'); */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');

* {
  margin: 0;
  padding: 0;
}
 
 *, *::before, *::after {
   box-sizing: border-box;
   
 }
 html {
   font-size: 62.5%;
 }
 body {
   
   background-color: ${theme.grey100};
   font-size: 1.6rem;
   font-family: "Roboto", sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }

 img {
   max-width: 100%;
   height: auto;
 }

 ul {
   list-style: none;
 }
`;

export default GlobalStyle;
