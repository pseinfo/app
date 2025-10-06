import { ServerConfig } from '@pseinfo/app/types';
import { join } from 'node:path';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';

export const configureI18n = async ( config: ServerConfig ) : Promise< void > => {

    const { languages, fallbackLng, namespaces, fallbackNS, pattern, missing, preload = [] } = config.i18n;
    const { secure, debug } = config.server;

    await i18next
        .use( FsBackend )
        .use( LanguageDetector )
        .init( {
            lng: fallbackLng,
            fallbackLng: fallbackLng,
            preload: preload,
            supportedLngs: languages,
            ns: namespaces,
            defaultNS: fallbackNS,
            cleanCode: true,
            keySeparator: false,
            saveMissing: debug,
            debug: debug,
            backend: {
                loadPath: join( process.cwd(), pattern ),
                addPath: join( process.cwd(), missing )
            },
            detection: {
                order: [ 'cookie', 'header' ],
                lookupCookie: 'locale',
                caches: [ 'cookie' ],
                cookieSameSite: 'strict',
                cookieSecure: secure
            }
        } );

};

export const i18nMiddleware = handle( i18next );
export const i18nInstance = i18next;
