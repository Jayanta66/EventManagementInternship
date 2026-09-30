import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
        allowedHosts: ['fullstack-web-app-developed-by-jayanta.joyjagatbondu.com'],
    port: 5183
  }
})
