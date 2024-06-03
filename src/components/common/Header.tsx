import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { memo } from 'react'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import { NotMobile, Mobile, useResponsive } from '@/hook/useMediaQuery'
import UserInfo from '@/components/common/UserInfo'
import NavigationBar from '@/components/common/NavigationBar'
import { RxHamburgerMenu } from 'react-icons/rx'
import SideBar from '@/components/common/SideBar'

const Header = () => {
  const { isMobile } = useResponsive()
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <Container>
      <Wrapper $isMobile={isMobile}>
        <InnerWrapper>
          <h1>
            <NavLink to="/">Moneylicious</NavLink>
          </h1>
          <NotMobile>
            <NavigationBar />
          </NotMobile>
        </InnerWrapper>
        <NotMobile>
          <UserInfo />
        </NotMobile>
        <Mobile>
          <>
            <RxHamburgerMenu
              size={24}
              onClick={() => openModal('사이드바')}
              style={{ cursor: 'pointer' }}
            />
            {isOpen('사이드바') && (
              <ModalPortal>
                <SideBar closeModal={() => closeModal('사이드바')} />
              </ModalPortal>
            )}
          </>
        </Mobile>
      </Wrapper>
    </Container>
  )
}

export default memo(Header)

const Container = styled.header`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
  z-index: 99;
`

const Wrapper = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '1200px')};
  height: 65px;
  padding-left: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '0')};
  padding-right: ${({ $isMobile }) => ($isMobile ? '2.5rem' : '0')};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 25px;
    font-family: 'PyeongChangPeace-Bold';
  }
`

const InnerWrapper = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
`
