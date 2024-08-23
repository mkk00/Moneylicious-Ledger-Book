import { ReactNode } from 'react'
import styled from 'styled-components'
import { useResponsive } from '@/hook/useMediaQuery'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { isDesktopOrLaptop } = useResponsive()
  return (
    <Container $isDesktopOrLaptop={isDesktopOrLaptop}>
      <Header />
      <Main $isDesktopOrLaptop={isDesktopOrLaptop}>{children}</Main>
      <Footer />
    </Container>
  )
}

export default PageLayout

const Container = styled.div<{ $isDesktopOrLaptop: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $isDesktopOrLaptop }) =>
    $isDesktopOrLaptop ? '100vw' : 'inherit'};
  min-height: 100vh;
`

const Main = styled.main<{ $isDesktopOrLaptop: boolean }>`
  width: ${({ $isDesktopOrLaptop }) =>
    $isDesktopOrLaptop ? '1200px' : '100%'};
  margin: 80px auto 180px auto;
  flex: 1;
`
