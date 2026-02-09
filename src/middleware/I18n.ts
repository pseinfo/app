import { IMiddleware } from '@pseinfo/app/types/interfaces';
import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
import { join } from 'node:path';
import { Handler, NextFunction, Request, Response } from 'express';
import i18next, { i18n } from 'i18next';
import I18NexFsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';

export class I18nMiddleware implements IMiddleware {

    private _initialized: boolean = false;

    public async initialize () : Promise< void > {

        if ( this._initialized ) {
            serviceFactory.logger.debug( `I18n already initialized` );
            return;
        }

        try {

            const cwd = process.cwd();
            const { languages, fallbackLng, namespaces, fallbackNS, pattern, missing, preload } = serviceFactory.config.i18n;
            const { secure, debug } = serviceFactory.config.server;
            
            await i18next
                .use( I18NexFsBackend )
                .use( LanguageDetector )
                .init( {
                    lng: fallbackLng,
                    fallbackLng: fallbackLng,
                    preload: preload || [ fallbackLng ],
                    supportedLngs: languages,
                    ns: namespaces,
                    defaultNS: fallbackNS,
                    fallbackNS: fallbackNS,
                    cleanCode: true,
                    keySeparator: false,
                    saveMissing: debug,
                    debug: debug,
                    showSupportNotice: false,
                    backend: {
                        loadPath: join( cwd, pattern ),
                        addPath: join( cwd, missing )
                    },
                    detection: {
                        order: [ 'cookie', 'header' ],
                        lookupCookie: 'locale',
                        caches: [ 'cookie' ],
                        cookieSameSite: 'strict',
                        cookieSecure: secure
                    },
                    interpolation: {
                        escapeValue: false
                    }
                } );

            this._initialized = true;
            serviceFactory.logger.debug( 'I18n initialized successfully', { languages, namespaces } );

        } catch ( error ) {
            serviceFactory.logger.fatal( `Failed to initialize i18n`, error );
        }

    }

    public execute ( req: Request, res: Response, next: NextFunction ) : void {

        if ( ! this._initialized ) {
            serviceFactory.logger.warn( `I18n not initialized, skipping middleware` );
            return next();
        }

        handle( i18next )( req, res, next );

    }

    public getInstance () : i18n {
        return i18next;
    }

    public getMiddleware () : Handler {
        return handle( i18next );
    }

}

// global singleton instance
let i18nInstance: I18nMiddleware;
export { i18nInstance };

export async function configureI18n () : Promise< I18nMiddleware > {

    i18nInstance ||= new I18nMiddleware();
    await i18nInstance.initialize();

    return i18nInstance;

}

export function i18nMiddleware ( req: Request, res: Response, next: NextFunction ) : void {

    if ( i18nInstance ) i18nInstance.execute( req, res, next );
    else next();

}
