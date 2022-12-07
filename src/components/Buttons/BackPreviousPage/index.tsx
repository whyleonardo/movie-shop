import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/react'

export const BackPreviousPage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const buttonIsDisplayed = pathname.includes('/movie')

  return (
    <IconButton
      icon={<FaArrowLeft size='1.5rem' />}
      display={buttonIsDisplayed ? 'block' : 'none'}
      aria-label='Back to Homepage'
      onClick={() => navigate(-1)}
      bg='none'
      transform='auto'
      _active={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
      _hover={{ bg: 'none', scale: 1.1 }}
      cursor='pointer'
      zIndex='10000'
    />
  )
}
