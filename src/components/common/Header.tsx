import styled, { useTheme } from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import AuthButton from '@/components/button/AuthButton'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import useAuthStore from '@/store/useAuthStore'
import Profile from '@/components/common/Profile'

const MENU_LIST = [
  {
    name: '대시보드',
    path: '/dashboard'
  },
  { name: '자산관리', path: '/management' },
  { name: '커뮤니티', path: '/board' }
]

const Header = () => {
  const navigate = useNavigate()
  const { userInfo, isLogin } = useAuthStore()

  const { color } = useTheme()

  const { isOpen, openModal, closeModal } = useModal()

  const navActiveStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? color.sub : color.white,
    fontWeight: isActive ? 'bold' : 'normal'
  })

  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <h1>
            <NavLink to="/">Moneylicious</NavLink>
          </h1>
          <nav>
            <MenuList>
              {MENU_LIST.map(menu => (
                <li key={`menu-${menu.name}`}>
                  <NavLink
                    to={menu.path}
                    style={navActiveStyle}>
                    {menu.name}
                  </NavLink>
                </li>
              ))}
            </MenuList>
          </nav>
        </InnerWrapper>
        {isLogin ? (
          <Profile userInfo={userInfo} />
        ) : (
          <AuthButtons>
            <AuthButton
              text="로그인"
              size="small"
              type="main"
              onClick={() => openModal('로그인')}
            />
            <AuthButton
              text="회원가입"
              size="small"
              onClick={() => navigate('/signup')}
            />
          </AuthButtons>
        )}
        {isOpen('로그인') && (
          <ModalPortal>
            <LoginModal closeModal={() => closeModal('로그인')} />
          </ModalPortal>
        )}
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
  z-index: 9999;
`

const Wrapper = styled.div`
  width: 1200px;
  height: 65px;
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

const MenuList = styled.ul`
  width: 100%;
  display: flex;
  gap: 50px;
`

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`
