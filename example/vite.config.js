import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['uni-vue3-router']
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
    hmr: true
  },
  base: '/',
  build: {
    minify: false,
    sourcemap: true
  }
}); 