import { App } from './App'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { theme } from '@theme/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
  // </React.StrictMode>
)
