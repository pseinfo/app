import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import i18nConfig from '@pseinfo/i18n/config/app';
import { defineConfig } from 'astro/config';


const getAliasUrl = ( path ) => new URL( path, import.meta.url ).pathname;

export default defineConfig( {
  site: 'https://pse-info.de',
  output: 'static',
  outDir: 'dist',
  publicDir: 'public',
  trailingSlash: 'ignore',
  compressHTML: 'jsx',

  i18n: i18nConfig.astro,

  integrations: [
    react(),
    sitemap( {
      filenameBase: 'sitemap',
      entryLimit: 1000,
      i18n: i18nConfig.integrations.sitemap
    } )
  ],

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets'
  },

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

            if ( name && name.endsWith( '.css' ) ) return 'assets/css/[hash].css';
            else return 'assets/[hash][extname]';
          }
        }
      }
    }
  }
} );
