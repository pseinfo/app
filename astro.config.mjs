import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const getAliasUrl = ( path ) => new URL( path, import.meta.url ).pathname;

export default defineConfig( {
  integrations: [
    react()
  ],

  site: 'https://pse-info.de',
  base: './dist',
  publicDir: './public',
  output: 'static',
  compressHTML: true,

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
