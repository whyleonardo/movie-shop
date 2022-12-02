import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@components/Brand/Logo'
import { PasswordField } from '@components/Inputs/PasswordField'
import { getAuth } from 'firebase/auth'
import { handleRegisterUserWithEmailAndPassword } from '@utils/firebaseAuth/EmailAndPassword'
import { useState } from 'react'

export interface RegisterInfoProps {
  email: string
  password: string
  username: string
}

export const Register = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfoProps>({
    email: '',
    password: '',
    username: '',
  })

  const handleChangeRegisterInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const { currentUser } = getAuth()

  const toast = useToast()
  const navigate = useNavigate()
  const { email, username } = registerInfo

  const handleRegisterUser = async () => {
    try {
      await handleRegisterUserWithEmailAndPassword(registerInfo)
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top-left',
      })
    } finally {
      if (currentUser) {
        navigate('/')
      }
    }
  }

  return (
    <Container
      display='flex'
      pt='2.5rem'
      h={{ base: '90vh', md: '100vh' }}
      justifyContent='center'
      alignItems='center'
    >
      <Stack minW={{ base: '100%', md: '30rem' }}>
        <Stack spacing='6'>
          <Logo fontSize='2rem' alignSelf='center' />
          <Stack spacing={{ base: '2', md: '2' }} textAlign='center'>
            <Heading size='lg'>Register a new account</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Have an account?</Text>
              <Button variant='link' as={Link} to='/login' colorScheme='blue'>
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('lg', 'lg') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing='6'>
            <Stack spacing='2'>
              <FormControl>
                <Stack>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    name='email'
                    id='email'
                    type='email'
                    onChange={handleChangeRegisterInfo}
                    value={registerInfo.email}
                    isInvalid={email == ''}
                    isRequired
                    blur={{ bg: 'red ' }}
                  />

                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <Input
                    name='username'
                    id='username'
                    type='text'
                    onChange={handleChangeRegisterInfo}
                    value={registerInfo.username}
                    isInvalid={username == ''}
                    isRequired
                  />
                </Stack>
              </FormControl>
              <PasswordField
                name='password'
                id='password'
                onChange={handleChangeRegisterInfo}
                value={registerInfo.password}
                isRequired
              />
            </Stack>

            <HStack justify='space-between'></HStack>
            <Stack spacing='6'>
              <Button
                disabled={email == '' && username == ''}
                onClick={handleRegisterUser}
                variant='primary'
                bg='blue.500'
                color='white'
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
