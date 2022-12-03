import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import { FormikErrors, FormikTouched } from 'formik'

import { HiEye, HiEyeOff } from 'react-icons/hi'
import { forwardRef, useRef } from 'react'

interface PasswordFieldProps extends InputProps {
  formik: {
    errors: FormikErrors<{ password: string }>
    touched: FormikTouched<{ password: string }>
  }
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl isInvalid={props.formik.errors.password && props.formik.touched.password}>
      <FormLabel htmlFor='password'>Password</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          id='password'
          name='password'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          {...props}
        />
      </InputGroup>
      {props.formik.errors.password && (
        <FormErrorMessage>
          {props.formik.errors.password && props.formik.errors.password}
        </FormErrorMessage>
      )}
    </FormControl>
  )
})

PasswordField.displayName = 'PasswordField'
