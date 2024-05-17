import { ReactNode } from 'react'
import styled from 'styled-components'

const ProfileLayout = ({
  children,
  closeModal,
  width = 'fit-content',
  height = 'fit-content'
}: {
  children: ReactNode
  closeModal: () => void
  width?: string
  height?: string
}) => {
  return (
    <>
      <Overlay onClick={() => closeModal()} />
      <Container
        onClick={e => e.stopPropagation()}
        width={width}
        height={height}>
        {children}
      </Container>
    </>
  )
}

export default ProfileLayout

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`

const Container = styled.div<{ width: string; height: string }>`
  position: absolute;
  right: 0;
  top: 40px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: 200px;
  max-height: 250px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  color: initial;
  z-index: 101;
`
