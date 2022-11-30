import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'


import { AnimatedRoutes } from '@components/layout/AnimatedRoutes'
import { Home } from '@pages/Home'
import { MobileNav } from '@components/layout/MobileNav'
import { SidebarContent } from '@components/layout/SidebarContent'
import { useLocation } from 'react-router-dom'

export const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pathname } = useLocation()

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
        flexDirection='column'
        gap='2'
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        p='4'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'red',
            borderRadius: '24px',
          },
        }}
      >
        {pathname === '/' ? <Home /> : <AnimatedRoutes />}
      </Box>
    </Box>
  )
}

