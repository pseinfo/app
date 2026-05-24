import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import i18nInit from '@pseinfo/i18n/config/app';
import { defineConfig } from 'astro/config';

import { getAliasUrl } from './lib/build-utils.mjs';


export default defineConfig( {
  integrations: [
    react(),
    sitemap( {
      filenameBase: 'sitemap',
      i18n: i18nInit.sitemap
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
        '@/base': getAliasUrl( './src/components/base' ),
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

  i18n: i18nInit.routing
} );
