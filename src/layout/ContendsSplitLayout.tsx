import { ReactNode } from 'react'
import styled from 'styled-components'

const ContendsSplitLayout = ({
  left,
  center,
  right,
  flex
}: {
  left: ReactNode
  center?: ReactNode
  right?: ReactNode
  flex?: number[]
}) => {
  return (
    <Container>
      {left && <Left $flex={flex?.[0]}>{left}</Left>}
      {center && <Center $flex={flex?.[1]}>{center}</Center>}
      {right && <Right $flex={flex?.[2]}>{right}</Right>}
    </Container>
  )
}

export default ContendsSplitLayout

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Left = styled.section<{ $flex?: number }>`
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
`

const Center = styled.section<{ $flex?: number }>`
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
`

const Right = styled.section<{ $flex?: number }>`
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
`
