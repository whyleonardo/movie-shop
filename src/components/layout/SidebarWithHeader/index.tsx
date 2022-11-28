import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import {
  FaBars,
  FaCalendar,
  FaChartLine,
  FaChevronDown,
  FaHeart,
  FaHome,
  FaStar,
} from 'react-icons/fa'

import { Link as RouterLink, useLocation } from 'react-router-dom'

import { AnimatedRoutes } from '@components/layout/AnimatedRoutes'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { IconType } from 'react-icons'
import { Logo } from '@components/Brand/Logo'

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FaHome, path: '/' },
  { name: 'Popular', icon: FaChartLine, path: '/popular' },
  { name: 'Top Rated', icon: FaStar, path: '/top-rated' },
  { name: 'Upcoming', icon: FaCalendar, path: '/upcoming' },
  { name: 'Favorites', icon: FaHeart, path: '/favorites' },
]

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
      >
        {pathname === '/' ? 'olá' : <AnimatedRoutes />}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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

interface NavItemProps extends FlexProps {
  icon: IconType
  path: string
  onClose: () => void
}

const NavItem = ({ icon, children, path, onClose, ...rest }: NavItemProps) => {
  const { pathname } = useLocation()
  return (
    <Link as={RouterLink} onClick={onClose} to={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        bg={path == pathname ? 'blue.500' : 'transparent'}
        color={path == pathname ? 'white' : undefined}
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link >
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      gap='2rem'
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FaBars />}
      />

      <Logo display={{ base: 'flex', md: 'none' }} />
      <ColorModeSwitch display={{ base: 'none', md: 'flex' }} />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>Justina Clark</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FaChevronDown size='0.8rem' />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
