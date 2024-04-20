import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import GlobalStyle from '@/styles/global-styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routerList } from '@/utils/router'

const router = createBrowserRouter(routerList)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>
)
