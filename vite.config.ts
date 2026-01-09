import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 👇 REQUIRED for GitHub Pages
  base: '/barbershope/',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
