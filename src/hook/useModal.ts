import { useState } from 'react'

interface Modals {
  [key: string]: boolean
}

const useModal = () => {
  const [modals, setModals] = useState<Modals>({})

  const openModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: true
    }))
    document.body.style.overflow = 'hidden'
  }

  const closeModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: false
    }))
    document.body.style.overflow = 'auto'
  }

  const isOpen = (key: string) => modals[key]

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useModal
