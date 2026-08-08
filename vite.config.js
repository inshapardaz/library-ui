import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  server: {
    port: 4400,
  },
  test: {
    environment: 'node',
    setupFiles: ['./src/test/setup.js'],
    exclude: ['**/node_modules/**', 'tests/**'],
  },
})
