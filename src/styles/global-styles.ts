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
    overflow: hidden;
    font-family: 'NanumSquareNeo-Variable', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
