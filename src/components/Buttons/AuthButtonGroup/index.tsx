import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

const providers = [
  { name: 'Google', icon: <FaGoogle size="20" /> },
  { name: 'Twitter', icon: <FaTwitter size="20" /> },
  { name: 'GitHub', icon: <FaGithub size="20" /> },
]

export const AuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
)
