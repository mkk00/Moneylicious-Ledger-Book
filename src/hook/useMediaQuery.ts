import { ReactNode, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

interface Responsive {
  isMobile: boolean
  isTablet: boolean
  isDesktopOrLaptop: boolean
  isNotMobile: boolean
}

export const useResponsive = (): Responsive => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 })
  const isNotMobile = useMediaQuery({ minWidth: 768 })

  return useMemo(
    () => ({ isMobile, isTablet, isDesktopOrLaptop, isNotMobile }),
    [isMobile, isTablet, isDesktopOrLaptop, isNotMobile]
  )
}

export const Mobile = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useResponsive()
  return isMobile ? children : null
}

export const Tablet = ({ children }: { children: ReactNode }) => {
  const { isTablet } = useResponsive()
  return isTablet ? children : null
}

export const DesktopOrLaptop = ({ children }: { children: ReactNode }) => {
  const { isDesktopOrLaptop } = useResponsive()
  return isDesktopOrLaptop ? children : null
}

export const NotMobile = ({ children }: { children: ReactNode }) => {
  const { isNotMobile } = useResponsive()
  return isNotMobile ? children : null
}
