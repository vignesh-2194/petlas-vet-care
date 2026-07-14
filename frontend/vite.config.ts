import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // 1. Automatically reads variables from Vercel's settings panel
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    // 2. Injects the URL directly into your production frontend package
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://petlas-vet-care.onrender.com')
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://petlas-vet-care.onrender.com',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    }
  }
})
