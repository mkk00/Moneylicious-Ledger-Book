import { ReactNode } from 'react'
import styled from 'styled-components'

const ContendsSplitLayout = ({ children }: { children: ReactNode[] }) => {
  const left = children[0]
  const right = children[1]
  return (
    <Container>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Container>
  )
}

export default ContendsSplitLayout

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Left = styled.section`
  flex: 3;
`

const Right = styled.section`
  flex: 1;
`
