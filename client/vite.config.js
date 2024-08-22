import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: '/register',
  },
  define: {
    'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(
      process.env.VITE_GOOGLE_CLIENT_ID,
    ),
    'process.env.VITE_GOOGLE_CLIENT_SECRET': JSON.stringify(
      process.env.VITE_GOOGLE_CLIENT_SECRET,
    ),
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
});
