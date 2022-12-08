import * as Yup from 'yup'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
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
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'

import { AuthButtonGroup } from '@components/Buttons/AuthButtonGroup'
import { Logo } from '@components/Brand/Logo'
import { PasswordField } from '@components/Inputs/PasswordField'
import { handleSignInUserWithEmailAndPassword } from '@utils/firebaseAuth/EmailAndPassword'
import { useFormik } from 'formik'
import { useEffect } from 'react'

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Insert an valid email'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Insert an valid password'),
})

export const Login = () => {
  const auth = getAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      checkbox: false,
    },
    validateOnBlur: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSignInUserWithEmailAndPassword(values)
        .then(() => {
          navigate('/')

          if (values.checkbox) {
            setPersistence(auth, browserLocalPersistence)
          }
        })

        .catch((error) => {
          toast({
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top-left',
          })
        })
    },
  })

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/')
    }
  }, [auth.currentUser])

  return (
    <Container
      display='flex'
      pt='2.5rem'
      h={{ base: '90vh', md: '100vh' }}
      justifyContent='center'
      alignItems='center'
    >
      <Stack minW={{ base: '100%', md: '30rem' }}>
        <Stack display='flex' spacing='6'>
          <Logo display='flex' fontSize='2rem' alignSelf='center' />
          <Stack spacing={{ base: '2', md: '2' }} textAlign='center'>
            <Heading size='lg'>Log in to your account</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Dont have an account?</Text>
              <Button variant='link' as={Link} to='/register' colorScheme='blue'>
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '4', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: 'md' }}
          border='1px'
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          borderRadius={{ base: 'md', sm: 'xl' }}
        >
          {' '}
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                  <Stack>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                      name='email'
                      id='email'
                      type='email'
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && (
                      <FormErrorMessage>
                        {formik.errors.email && formik.errors.email}
                      </FormErrorMessage>
                    )}
                  </Stack>
                </FormControl>

                <PasswordField
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  formik={formik}
                />
              </Stack>
              <HStack justify='space-between'>
                <Checkbox
                  onChange={formik.handleChange}
                  name='checkbox'
                  isChecked={formik.values.checkbox}
                >
                  Remember Me
                </Checkbox>
                <Button variant='link' colorScheme='blue' size='sm'>
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing='6'>
                <Button type='submit' variant='primary' bg='blue.500' color='white'>
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <AuthButtonGroup />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}
