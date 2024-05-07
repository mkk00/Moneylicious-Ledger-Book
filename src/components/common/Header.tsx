import styled, { useTheme } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { memo } from 'react'

const MENU_LIST = [
  {
    name: '대시보드',
    path: '/dashboard'
  },
  { name: '자산관리', path: '/management' },
  { name: '커뮤니티', path: '/board' },
  { name: '마이페이지', path: '/mypage' }
]

const BaseHeader = () => {
  const { color } = useTheme()

  const navActiveStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? color.sub : color.white,
    fontWeight: isActive ? 'bold' : 'normal'
  })

  return (
    <Container>
      <Wrapper>
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
      </Wrapper>
    </Container>
  )
}

const Header = memo(BaseHeader)

export default Header

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
  align-items: center;
  gap: 100px;

  h1 {
    font-size: 25px;
  }
`

const MenuList = styled.ul`
  width: 100%;
  display: flex;
  gap: 50px;
`
