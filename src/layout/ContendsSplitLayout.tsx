import { ReactNode } from 'react'
import styled from 'styled-components'
import { useResponsive } from '@/hook/useMediaQuery'

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
  const { isDesktopOrLaptop } = useResponsive()
  return (
    <Container $isDesktopOrLaptop={isDesktopOrLaptop}>
      {left && <Left $flex={flex?.[0]}>{left}</Left>}
      {center && <Center $flex={flex?.[1]}>{center}</Center>}
      {right && <Right $flex={center ? flex?.[2] : flex?.[1]}>{right}</Right>}
    </Container>
  )
}

export default ContendsSplitLayout

const Container = styled.div<{ $isDesktopOrLaptop: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isDesktopOrLaptop }) =>
    $isDesktopOrLaptop ? 'row' : 'column'};
  gap: ${({ $isDesktopOrLaptop }) => ($isDesktopOrLaptop ? '0' : '30px')};
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
