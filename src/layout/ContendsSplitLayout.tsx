import { ReactNode } from 'react'
import styled from 'styled-components'

const ContendsSplitLayout = ({ children }: { children: ReactNode[] }) => {
  const left = children[0]
  const center = children[1]
  const right = children[2]
  return (
    <Container>
      <Left>{left}</Left>
      <Center>{center}</Center>
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
  flex: 2;
`

const Center = styled.section`
  flex: 1;
`

const Right = styled.section`
  flex: 1;
`
