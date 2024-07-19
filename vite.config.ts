import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      'import.meta.env.APP_API_KEY': JSON.stringify(env.API_KEY),
      'import.meta.env.APP_BASE_URL': JSON.stringify(env.BASE_URL),
    },
    server: {
      port: 5174,
    },
  }
})
