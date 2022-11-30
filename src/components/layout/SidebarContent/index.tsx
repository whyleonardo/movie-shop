import { Box, BoxProps, CloseButton, Flex, useColorModeValue } from '@chakra-ui/react'
import { FaCalendar, FaChartLine, FaHeart, FaHome, FaShoppingCart, FaStar } from 'react-icons/fa'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { IconType } from 'react-icons'
// import { LinkItems } from '@utils/LinkItems'
import { Logo } from '@components/Brand/Logo'
import { NavItem } from '@components/layout/NavItem'
import { useCart } from '@context/Cart'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
  itemsLength?: number
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { moviesCart } = useCart()

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FaHome, path: '/' },
    { name: 'Popular', icon: FaChartLine, path: '/popular' },
    { name: 'Top Rated', icon: FaStar, path: '/top-rated' },
    { name: 'Upcoming', icon: FaCalendar, path: '/upcoming' },
    { name: 'Favorites', icon: FaHeart, path: '/favorites', itemsLength: 2 },
    { name: 'Cart', icon: FaShoppingCart, path: '/cart', itemsLength: moviesCart.length },
  ]

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
        <NavItem key={link.name} path={link.path} onClose={onClose} icon={link.icon} itemsLength={link.itemsLength}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
