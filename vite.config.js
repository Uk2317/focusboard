import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow the sandboxed preview proxy host to reach the app.
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
})
