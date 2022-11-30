import { Avatar, Box, Flex, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { BackPreviousPage } from '@components/Buttons/BackPreviousPage'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { Logo } from '@components/Brand/Logo'
import { useLocation } from 'react-router-dom'


interface MobileProps extends FlexProps {
  onOpen: () => void
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { pathname } = useLocation()
  const isMovieDetailsLocation = pathname.includes('/movie')

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
      justifyContent={isMovieDetailsLocation ? 'space-between' : { base: 'space-between', md: 'flex-end' }}
      {...rest}>

      {isMovieDetailsLocation
        ? <BackPreviousPage />
        : <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FaBars />}
        />
      }

      <Logo display={{ base: 'flex', md: 'none' }} />

      <Flex gap='2rem' alignItems='center'>

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
    </Flex>
  )
}