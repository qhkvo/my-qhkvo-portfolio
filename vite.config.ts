import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project site: served from https://qhkvo.github.io/my-qhkvo-portfolio/
export default defineConfig({
  base: '/my-qhkvo-portfolio/',
  plugins: [react()],
});
