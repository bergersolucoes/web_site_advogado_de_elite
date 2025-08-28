import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 esse base é FUNDAMENTAL pra hospedar fora da raiz do domínio
export default defineConfig({
  base: './',
  plugins: [react()],
})
