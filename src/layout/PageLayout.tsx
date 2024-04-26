import { ReactNode } from 'react'
import styled from 'styled-components'

import Header from '@/components/common/Header'

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  )
}

export default PageLayout

const Container = styled.div`
  width: 100vw;
  height: auto;
`

const Main = styled.main`
  width: 1200px;
  margin: 0 auto;
  margin: 80px auto;
`
