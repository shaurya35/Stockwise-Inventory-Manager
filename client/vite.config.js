import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': "http://localhost:8080/" 
      '/api': "https://stockwise-server-8006.onrender.com/" 
    }
  },
  plugins: [react()],
})
