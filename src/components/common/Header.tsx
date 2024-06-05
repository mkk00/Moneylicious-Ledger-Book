import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { memo, useEffect } from 'react'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import { NotMobile, Mobile, useResponsive } from '@/hook/useMediaQuery'
import UserInfo from '@/components/common/UserInfo'
import NavigationBar from '@/components/common/NavigationBar'
import { RxHamburgerMenu } from 'react-icons/rx'
import SideBar from '@/components/common/SideBar'
import useAuthStore from '@/store/useAuthStore'
import { UserInfoProps } from '@/interface/authProps'
import { supabase } from '@/supabaseconfig'

const Header = () => {
  const { isMobile } = useResponsive()
  const { isOpen, openModal, closeModal } = useModal()
  const { userInfo, setUserInfo } = useAuthStore()

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('userinfo')
          .select('*')
          .eq('id', userInfo?.id)
          .returns<UserInfoProps[] | null>()

        if (data) {
          console.log(data[0])
          data &&
            setUserInfo({
              ...userInfo,
              image_url: data[0].image_url,
              username: data[0].username,
              message: data[0].message
            })
        }
        error && alert(`헤더오류:${error.message}`)
      } catch (error) {
        console.error(error)
      }
    }
    userInfo && getUserInfo()
  }, [])

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
