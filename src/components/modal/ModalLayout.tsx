import { Dispatch, ReactNode, SetStateAction } from 'react'
import styled from 'styled-components'

const ModalLayout = ({
  children,
  setOpen,
  width = 'fit-content',
  height = 'fit-content'
}: {
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  width?: string
  height?: string
}) => {
  return (
    <Overlay onClick={() => setOpen(false)}>
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
