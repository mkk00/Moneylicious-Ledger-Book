import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const OverlayPortal = ({ children }: { children: ReactNode }) => {
  const overlayRoot = document.getElementById('modal-overlay') as HTMLElement
  return createPortal(children, overlayRoot)
}

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const modalRoot = document.getElementById('portal') as HTMLElement
  return createPortal(children, modalRoot)
}

export default ModalPortal
