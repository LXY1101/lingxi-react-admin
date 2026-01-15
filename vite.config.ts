import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'dashes',
      generateScopedName: '[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {}
    }
  }
})
