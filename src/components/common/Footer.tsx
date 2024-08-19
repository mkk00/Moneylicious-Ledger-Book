import styled from 'styled-components'
import { memo } from 'react'
import { useResponsive } from '@/hook/useMediaQuery'
import CopyToClipboard from '@/components/common/CopyToClipboard'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const { isMobile } = useResponsive()

  return (
    <Container>
      <Wrapper $isMobile={isMobile}>
        <h2>
          <NavLink to="/">
            <Logo
              src="/moneylicious.svg"
              alt="moneylicios logo"
            />
          </NavLink>
        </h2>
        <Info>
          <span>Moneylicious</span>
          <p>Developed by : mkk0</p>
          <p>
            m : <CopyToClipboard text="010-9188-0240" />
          </p>
          <p>
            e-mail : <CopyToClipboard text="it1210@naver.com" />
          </p>
          <p>
            link :{' '}
            <a href="https://github.com/mkk00/Moneylicious-Ledger-Book">
              https://github.com/mkk00/Moneylicious-Ledger-Book
            </a>
          </p>
        </Info>
      </Wrapper>
    </Container>
  )
}

export default memo(Footer)

const Container = styled.footer`
  width: 100vw;
  height: 200px;
  background: ${({ theme }) => theme.gray.gray_50};
  color: ${({ theme }) => theme.gray.gray_300};
`

const Wrapper = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '1200px')};
  height: 100%;
  padding-left: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '0')};
  padding-right: ${({ $isMobile }) => ($isMobile ? '2.5rem' : '0')};
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;

  p {
    padding-left: 8px;
  }
`

const Logo = styled.img`
  width: 80px;
  height: 80px;
  filter: brightness(1000%);
`

const Info = styled.div`
  font-size: 0.8rem;
  display: flex;
  gap: 4px;
  flex-direction: column;

  & span {
    font-family: 'PyeongChangPeace-Bold';
    font-weight: bold;
    font-size: 1.2rem;
  }

  & a {
    text-decoration: underline;
    &:hover {
      font-weight: bold;
    }
  }
`
