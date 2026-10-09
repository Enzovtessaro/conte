import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // CommonJS packages that Node can't import by named export during prerender.
    noExternal: ['react-helmet-async'],
  },
});
