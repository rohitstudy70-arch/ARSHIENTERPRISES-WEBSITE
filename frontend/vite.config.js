import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const rootDir = typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : process.cwd();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        about: resolve(rootDir, 'about-us.html'),
        approvedStates: resolve(rootDir, 'approved-states.html'),
        events: resolve(rootDir, 'events.html'),
      },
    },
  },
});
