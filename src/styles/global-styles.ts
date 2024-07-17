import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'PyeongChangPeace-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  html,
  body {
    font-family: 'NanumSquareRound', sans-serif;
    max-width: 100vw;
    overflow: scroll;
    -ms-overflow-style: none;
  }

  body::-webkit-scrollbar {
    display: none;
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
    color: inherit;
    -webkit-appearance: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  ol,
  ul {
    list-style: none;
  }
`

export default GlobalStyle
