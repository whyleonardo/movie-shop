import { ThemeConfig, extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  disableTransitionOnChange: false,
}

const colors = {
  brand: {
    100: '#99a0b2ff',
    200: '#8f96aaff',
    300: '#848ba1ff',
    400: '#787f98ff',
    500: '#6b728eff',
    600: '#50577aff',
    700: '#474e68ff',
    800: '#404258ff',
    900: '#3a3c50ff',
  },
}
export const theme = extendTheme({ config, colors })
