import { ReactNode } from 'react'
import styled from 'styled-components'

const ModalLayout = ({
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
    <Overlay onClick={() => closeModal()}>
      <Container
        onClick={e => e.stopPropagation()}
        width={width}
        height={height}>
        {children}
      </Container>
    </Overlay>
  )
}

export default ModalLayout

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(2px);
`

const Container = styled.div<{ width: string; height: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: 1000px;
  max-height: 500px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-radius: 10px;
  z-index: 101;
`
