import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { getAliasUrl } from './lib/build-utils.mjs';


export default defineConfig( {
  integrations: [
    react(),
    sitemap( {
      filenameBase: 'sitemap',
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-DE',
          fr: 'fr-FR'
        }
      }
    } )
  ],

  site: 'https://pse-info.de',
  publicDir: 'public',
  output: 'static',
  compressHTML: true,
  outDir: 'dist',

  vite: {
    resolve: {
      alias: {
        '@': getAliasUrl( './src' ),
        '@/asset': getAliasUrl( './src/assets' ),
        '@/ctx': getAliasUrl( './src/context' ),
        '@/hook': getAliasUrl( './src/hooks' ),
        '@/layout': getAliasUrl( './src/components/layout' ),
        '@/lib': getAliasUrl( './src/lib' ),
        '@/page': getAliasUrl( './src/pages' ),
        '@/type': getAliasUrl( './src/types' ),
        '@/ui': getAliasUrl( './src/components/ui' )
      }
    }
  },

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets',
    client: 'client'
  },

  i18n: {
    defaultLocale: 'en',
    locales: [ 'en', 'de', 'fr' ],
    routing: {
      prefixDefaultLocale: false
    }
  }
} );
