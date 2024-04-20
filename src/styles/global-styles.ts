import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    font-family: 'NanumSquareNeo-Variable', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
  }

  ol,
  ul {
    list-style: none;
  }
`

export default GlobalStyle
