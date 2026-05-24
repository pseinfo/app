import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import { getAliasUrl } from './lib/build-utils.mjs';


export default defineConfig( {
  integrations: [
    react()
  ],

  site: 'https://pse-info.de',
  base: './',
  publicDir: './public',
  output: 'static',
  compressHTML: true,
  outDir: '/dist',

  vite: {
    resolve: {
      alias: {
        '@': getAliasUrl( './src' )
      }
    }
  },

  build: {
    format: 'directory',
    client: './client',
    inlineStylesheets: 'never'
  },

  i18n: {
    defaultLocale: 'en',
    locales: [ 'en', 'de', 'fr' ],
    routing: {
      prefixDefaultLocale: true
    }
  }
} );
