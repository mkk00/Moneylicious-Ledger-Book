import { ReactNode } from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

const SideBarModalLayout = ({
  children,
  closeModal
}: {
  children: ReactNode
  closeModal: () => void
}) => {
  return (
    <Overlay onClick={() => closeModal()}>
      <button
        onClick={() => closeModal()}
        aria-label="사이드바 닫기">
        <IoCloseOutline size={36} />
      </button>
      <Container onClick={e => e.stopPropagation()}>{children}</Container>
    </Overlay>
  )
}

export default SideBarModalLayout

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(2px);

  & > button {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 102;
    cursor: pointer;

    svg {
      color: initial;
    }
  }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100vh;
  overflow: hidden;
  padding: 65px 45px;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 101;
`
