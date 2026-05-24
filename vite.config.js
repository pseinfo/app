import { resolve } from 'node:path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig ( {
  plugins: [
    legacy(),
    react()
  ],
  resolve: {
    alias: {
      '@': resolve( __dirname, 'src' )
    }
  },
  css: {
    transformer: 'postcss',
    postcss: './postcss.config.js'
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    minify: 'terser',
    cssCodeSplit: true,
    cssMinify: true
  }
} );
