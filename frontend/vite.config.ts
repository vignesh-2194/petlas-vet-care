import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        // Clear your old 'http://127.0.0.1:8000' target and replace it with this word format:
       target: 'http://localhost:8000',

        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
