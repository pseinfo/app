import react from '@astrojs/react';
import { defineConfig } from 'astro/config';


export default defineConfig( {
  site: 'https://pse-info.de',
  output: 'static',
  outDir: 'dist',
  publicDir: 'public',
  compressHTML: true,

  integrations: [
    react()
  ],

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets'
  }
} );
