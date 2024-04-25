import 'styled-components'
import { ColorTypes, GrayTypes } from '@/styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes
    gray: GrayTypes
  }
}
