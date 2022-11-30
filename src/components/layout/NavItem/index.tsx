import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { IconType } from 'react-icons'


interface NavItemProps extends FlexProps {
  icon: IconType
  path: string
  onClose: () => void
}

export const NavItem = ({ icon, children, path, onClose, ...rest }: NavItemProps) => {
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
