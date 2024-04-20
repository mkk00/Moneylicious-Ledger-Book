import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import GlobalStyle from '@/styles/global-styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@/pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>
)
