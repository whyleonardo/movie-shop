import { Heading, Icon } from '@chakra-ui/react'
import { FaFilm } from 'react-icons/fa'

interface LogoProps {
  fontSize?: string
  alignSelf?: string
  display?: { base: string; md: string } | 'flex'
}

export const Logo = ({ display, fontSize, alignSelf }: LogoProps) => {
  return (
    <Heading
      display={display}
      alignSelf={alignSelf}
      fontSize={fontSize}
      color='blue.500'
      alignItems='center'
    >
      <Icon as={FaFilm} color='blue.500' />
      Shop
    </Heading>
  )
}
