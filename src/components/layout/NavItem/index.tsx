import { Circle, Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
  icon: IconType
  path: string
  onClose: () => void
  itemsLength: number | undefined
}

export const NavItem = ({ icon, children, path, onClose, itemsLength, ...rest }: NavItemProps) => {
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
        justifyContent='space-between'
        {...rest}>
        <Flex alignItems='center'>
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />

          {children}
        </Flex>

        {itemsLength !== undefined && <Circle size='1.5rem' bg='red.500'>{itemsLength}</Circle>}
      </Flex>
    </Link >
  )
}
