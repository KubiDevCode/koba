import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['musky-payee-magnetic.ngrok-free.dev'],
    proxy: {
      '/chat': 'http://127.0.0.1:3000',
      '/event': 'http://127.0.0.1:3000',
    },
  },
  preview: {
    allowedHosts: true,
  },
})
