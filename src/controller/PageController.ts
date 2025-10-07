import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { ControllerOptions, CookieContext, GlobalContext } from '@pseinfo/app/types';
import { CookieOptions, Request, Response } from 'express';

export abstract class PageController extends BaseController {

    constructor ( options: ControllerOptions ) { super( options ) }

    protected canonicalURL ( req: Request ) : string { return `${ req.protocol }://${ req.get( 'host' ) }${ req.originalUrl }` }

    protected bodyClasses () : string { return `pt pt-page pt-${this.template} ${ ( this.meta.classes ?? [] ).join( ' ' ) }` }

    protected globalContext ( server: Server, req: Request ) : GlobalContext {

        return {
            i18n: req.t.bind( req ),
            server: server.cfg.cfg.server,
            site: {
                originalUrl: req.originalUrl,
                path: req.path,
                query: req.query,
                params: req.params
            },
            meta: {
                canonical: this.canonicalURL( req ),
                robots: 'index, follow'
            }
        };

    }

    protected cookieContext ( server: Server, req: Request, res: Response ) : CookieContext {

        const cookies: CookieContext = {};
        const cookieOpts: CookieOptions = {
            path: '/', sameSite: 'strict',
            secure: server.cfg.cfg.server.secure,
            expires: new Date( Date.now() + 1.2e9 )
        };

        for ( const [ key, def ] of Object.entries( server.cfg.cfg.cookies ?? {} ) ) {

            cookies[ key ] = req.cookies?.[ key ] || def;
            res.cookie( key, cookies[ key ], cookieOpts );

        }

        return cookies;

    }

    public handle ( server: Server, req: Request, res: Response ) : void {

        try {

            res.status( 200 ).render( this.template, {
                ...this.globalContext( server, req ),
                cookies: this.cookieContext( server, req, res ),
                bodyClasses: this.bodyClasses(),
                data: this.data
            } );

        } catch ( err ) {

            res.status( 500 ).render( 'base/error', { err } );

        }

    }

}
