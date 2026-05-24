import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const getAliasUrl = ( path ) => new URL( path, import.meta.url ).pathname;

export default defineConfig( {
  integrations: [
    react()
  ],

  output: 'static',

  vite: {
    resolve: {
      alias: {
        '@': getAliasUrl( './src' )
      }
    }
  }
} );
