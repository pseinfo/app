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
        '@/provider': getAliasUrl( './src/providers' ),
        '@/service': getAliasUrl( './src/services' ),
        '@/type': getAliasUrl( './src/types' ),
        '@/ui': getAliasUrl( './src/components/ui' )
      }
    },

    build: {
      assetsDir: 'assets',
      assetsInlineLimit: 0,
      cssCodeSplit: true,

      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[hash].js',
          chunkFileNames: 'assets/js/[hash].js',

          assetFileNames: ( assetInfo ) => {
            const name = assetInfo.names?.[ 0 ] ?? '';

            if ( name && name.endsWith( '.css' ) )
              return 'assets/css/[hash].css';
            else
              return 'assets/[name].[hash][extname]';
          }
        }
      }
    }
  },

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets'
  },

  i18n: i18nInit.routing
} );
