import * as Yup from 'yup'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Logo } from '@components/Brand/Logo'
import { PasswordField } from '@components/Inputs/PasswordField'
import { getAuth } from 'firebase/auth'
import { handleRegisterUserWithEmailAndPassword } from '@utils/firebaseAuth/EmailAndPassword'
import { useFormik } from 'formik'

const registerSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
})

export const Register = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const { currentUser } = getAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validateOnBlur: true,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegisterUserWithEmailAndPassword(values)
        .then(() => {
          setButtonLoading(true)
          navigate('/')
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
    currentUser && navigate('/')
  }, [currentUser])

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
          boxShadow={{ base: 'none', sm: 'md' }}
          border='1px'
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing='6'>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing='2'>
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

                <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                  <Stack>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input
                      name='username'
                      id='username'
                      type='text'
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.username && (
                      <FormErrorMessage>
                        {formik.errors.username && formik.errors.username}
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
              <Stack spacing='6'>
                <Button
                  type='submit'
                  disabled={!formik.isValid}
                  variant='primary'
                  bg='blue.500'
                  color='white'
                  mt='2rem'
                >
                  {buttonLoading ? 'Register' : <Spinner />}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
