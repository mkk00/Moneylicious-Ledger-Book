import { ReactNode } from 'react'
import styled from 'styled-components'

const ContendsSplitLayout = ({
  children,
  leftRatio = 1,
  rightRatio = 1
}: {
  children: ReactNode[]
  leftRatio?: number
  rightRatio?: number
}) => {
  const [left, right] = children
  return (
    <Container>
      <Contents ratio={leftRatio}>{left}</Contents>
      <Contents ratio={rightRatio}>{right}</Contents>
    </Container>
  )
}

export default ContendsSplitLayout

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Contents = styled.section<{ ratio?: number }>`
  flex: ${props => props.ratio};
`
