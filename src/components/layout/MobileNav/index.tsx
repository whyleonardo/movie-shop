import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User, getAuth, signOut } from 'firebase/auth'

import { BackPreviousPage } from '@components/Buttons/BackPreviousPage'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { Logo } from '@components/Brand/Logo'
import { useEffect, useState } from 'react'

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const colors = ['blue', 'red', 'green', 'orange', 'yellow', 'teal', 'cyan', 'purple', 'pink']
const randomNumber = Math.ceil(Math.random() * 8)

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [user, setUser] = useState<User>(null)
  const { pathname } = useLocation()
  const isMovieDetailsLocation = pathname.includes('/movie')
  const navigate = useNavigate()

  const auth = getAuth()

  console.log(auth.currentUser)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.updateCurrentUser(user).then(() => setUser(user))
      }
    })
  }, [])
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
      justifyContent={
        isMovieDetailsLocation ? 'space-between' : { base: 'space-between', md: 'flex-end' }
      }
      {...rest}
    >
      {isMovieDetailsLocation ? (
        <BackPreviousPage />
      ) : (
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FaBars />}
        />
      )}

      <Logo display={{ base: 'flex', md: 'none' }} />

      <Flex gap='1.5rem' alignItems='center'>
        <ColorModeSwitch display={{ base: 'none', md: 'flex' }} />

        {auth.currentUser ? (
          <HStack spacing={{ base: '0', md: '6' }}>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar
                      size={'sm'}
                      name={auth.currentUser?.displayName}
                      src={auth.currentUser?.photoURL}
                      bg={`${colors[randomNumber]}.300`}
                    />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems='flex-start'
                      spacing='1px'
                      ml='2'
                    >
                      <Text fontSize='sm'>{auth.currentUser?.displayName}</Text>
                      <Text fontSize='xs' color='gray.600'>
                        User
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <FaChevronDown size='0.8rem' />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      signOut(auth)
                      setTimeout(() => {
                        navigate('/login')
                      }, 1000)
                    }}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        ) : (
          <Button
            as={Link}
            to='/login'
            color={useColorModeValue('blue.500', 'gray.300')}
            variant='link'
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
