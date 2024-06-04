import { ReactNode } from 'react'
import styled from 'styled-components'
import { useResponsive } from '@/hook/useMediaQuery'
import Header from '@/components/common/Header'

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { isNotMobile } = useResponsive()
  return (
    <Container $isNotMobile={isNotMobile}>
      <Header />
      <Main $isNotMobile={isNotMobile}>{children}</Main>
    </Container>
  )
}

export default PageLayout

const Container = styled.div<{ $isNotMobile: boolean }>`
  width: ${({ $isNotMobile }) => ($isNotMobile ? '100vw' : 'inherit')};
  height: auto;
`

const Main = styled.main<{ $isNotMobile: boolean }>`
  width: ${({ $isNotMobile }) => ($isNotMobile ? '1200px' : '100%')};
  margin: 80px auto;
`
