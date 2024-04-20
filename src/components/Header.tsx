import styled from 'styled-components'

const MENU_LIST = ['대시보드', '자산관리', '커뮤니티', '마이페이지']

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <h1>서브라포</h1>
        <nav>
          <MenuList>
            {MENU_LIST.map(menu => (
              <li key={`menu-${menu}`}>{menu}</li>
            ))}
          </MenuList>
        </nav>
      </Wrapper>
    </Container>
  )
}

export default Header

const Container = styled.header`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: ${props => props.theme.color.main};
  color: ${props => props.theme.color.white};
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
