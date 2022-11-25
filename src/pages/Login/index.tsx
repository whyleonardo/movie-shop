import {
  Box,
  Button,
  Link as ChakraLink,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'

import { AuthButtonGroup } from '@components/Buttons/AuthButtonGroup'
import { Logo } from '@components/Brand/Logo'
import { PasswordField } from '@components/Inputs/PasswordFieldLogin'

export const Login = () => {
  return (
    <Container display='flex' pt='2.5rem' h={{ base: '90vh', md: '100vh' }} justifyContent='center' alignItems='center'>
      <Stack minW={{ base: '100%', md: '30rem' }}>
        <Stack spacing="6">
          <Logo fontSize='2rem' alignSelf='center' />
          <Stack spacing={{ base: '2', md: '2' }} textAlign="center">
            <Heading size='lg'>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Dont have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
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
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" bg='blue.500' color='white'>Sign in</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <AuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

