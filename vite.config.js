import { resolve } from 'node:path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression'

export default defineConfig ( {
  plugins: [
    legacy(),
    react(),
    viteCompression( {
      algorithm: 'gzip',
      threshold: 1024
    } )
  ],
  resolve: {
    alias: {
      '@': resolve( __dirname, 'src' ),
      '@/views': resolve( __dirname, 'src/views' )
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
