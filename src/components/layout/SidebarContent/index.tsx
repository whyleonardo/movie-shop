import { Box, BoxProps, CloseButton, Flex, useColorModeValue } from '@chakra-ui/react'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { LinkItems } from '@utils/LinkItems'
import { Logo } from '@components/Brand/Logo'
import { NavItem } from '@components/layout/NavItem'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      transition='200ms ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
      gap='2'
    >
      <Flex h='20' alignItems='center' mx='8' w='80%' justifyContent='space-between'>
        <Logo display='flex' />

        <Flex alignItems='center' gap='2rem'>
          <ColorModeSwitch display={{ base: 'flex', md: 'none' }} />

          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} path={link.path} onClose={onClose} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
