import { DefaultTheme } from 'styled-components'

const color = {
  main: '#3c5afe',
  main_light: '#6e84ff',
  main_dark: '#1934cd',
  sub: '#ff6e40',
  sub_light: '#fda488',
  sub_dark: '#dd4414',
  white: '#ffffff'
}

export const gray = {
  gray_50: '#f0f2f5',
  gray_100: '#e8ebed',
  gray_200: '#c9cdd2',
  gray_300: '#9ea4aa',
  gray_400: '#72787f'
}

export type ColorTypes = typeof color
export type GrayTypes = typeof gray

export const theme: DefaultTheme = {
  color,
  gray
}
