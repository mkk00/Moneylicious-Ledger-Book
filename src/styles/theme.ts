import { DefaultTheme } from 'styled-components'

const color = {
  main: '#3c5afe',
  sub: '#ff6e40',
  white: '#ffffff'
}

export type ColorTypes = typeof color

export const theme: DefaultTheme = {
  color
}
