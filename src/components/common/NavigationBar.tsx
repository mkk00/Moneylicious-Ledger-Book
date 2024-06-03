import styled, { css, useTheme } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useResponsive } from '@/hook/useMediaQuery'

const NavigationBar = () => {
  const MENU_LIST = [
    {
      name: '대시보드',
      path: '/dashboard'
    },
    { name: '자산관리', path: '/management' },
    { name: '커뮤니티', path: '/board' }
  ]

  const { color } = useTheme()
  const { isMobile } = useResponsive()

  const navActiveStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isMobile ? 'initial' : isActive ? color.sub : color.white,
    fontWeight: isActive ? 'bold' : 'normal'
  })

  return (
    <nav>
      <MenuList $isMobile={isMobile}>
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
  )
}

export default NavigationBar

const MenuList = styled.ul<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  gap: 50px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      & {
        flex-direction: column;
        color: black;
        gap: 25px;
        font-size: 1.2rem;
      }
    `}
`
