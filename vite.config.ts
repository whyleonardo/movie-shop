import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src', 'assets'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@context': resolve(__dirname, 'src', 'context'),
      '@data': resolve(__dirname, 'src', 'data'),
      '@hooks': resolve(__dirname, 'src', 'hooks'),
      '@pages': resolve(__dirname, 'src', 'pages'),
      '@theme': resolve(__dirname, 'src', 'theme'),
      '@types': resolve(__dirname, 'src', 'types'),
      '@services': resolve(__dirname, 'src', 'services'),
      '@utils': resolve(__dirname, 'src', 'utils'),
      // '@[folder name]': resolve(__dirname, 'src', '[folder name]')
    },
  },
  server: {
    port: 3000,
  },
})
