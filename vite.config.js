// d:\Hệ Thống AI\frontend\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập qua IP mạng nội bộ
    port: 5173,
    allowedHosts: true, // Cho phép Localtunnel, Serveo truy cập
    cors: true // Cho phép gọi API từ các domain khác nhau
  },
})