import react from '@astrojs/react';
import { defineConfig } from 'astro/config';


const getAliasUrl = ( path ) => new URL( path, import.meta.url ).pathname;

export default defineConfig( {
  site: 'https://pse-info.de',
  output: 'static',
  outDir: 'dist',
  publicDir: 'public',
  compressHTML: true,

  integrations: [
    react()
  ],

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
    }
  },

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets'
  }
} );
