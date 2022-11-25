import { FaMoon, FaSun } from 'react-icons/fa'
import { IconButton, useColorMode } from '@chakra-ui/react'

interface ColorModeSwitchProps {
  display?: { base: string, md: string }
}

export const ColorModeSwitch = ({ display }: ColorModeSwitchProps) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <IconButton
      display={display}
      aria-label='Color Mode Switcher'
      icon={isDark ? <FaSun size='1.3rem' /> : <FaMoon size='1.3rem' />}
      onClick={toggleColorMode}
      bg='none'
      _active={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
    />
  )
}

