import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { Assets, ControllerOptions, CookieContext, GlobalContext, PageData } from '@pseinfo/app/types';
import { CookieOptions, Request, Response } from 'express';

export abstract class PageController extends BaseController {

    constructor ( options: ControllerOptions ) { super( options ) }

    protected canonicalURL ( req: Request ) : string { return `${ req.protocol }://${ req.get( 'host' ) }${ req.originalUrl }` }

    protected bodyClasses () : string { return `pt pt-page pt-${this.template} ${ ( this.options.classes ?? [] ).join( ' ' ) }`.trim() }

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

    protected assetLoader ( server: Server ) : Assets {

        const { js: gJs = [], css: gCss = [] } = server.cfg.cfg.static.assets ?? {};
        const { js: pJs = [], css: pCss = [] } = this.options.assets ?? {};

        return {
            js: [ ...new Set( [ ...gJs, ...pJs ] ) ],
            css: [ ...new Set( [ ...gCss, ...pCss ] ) ]
        };

    }

    protected pageData ( req: Request ) : Required< PageData > {

        return { ...{
            title: req.t( `${this.template}:title`, this.dict ),
            description: req.t( `${this.template}:description`, this.dict ),
            keywords: []
        }, ...this.meta };

    }

    public handle ( server: Server, req: Request, res: Response ) : void {

        try {

            const globalContext = this.globalContext( server, req );

            res.status( 200 ).render( this.template, {
                ...globalContext,
                cookies: this.cookieContext( server, req, res ),
                meta: { ...globalContext.meta, ...this.pageData( req ) },
                assets: this.assetLoader( server ),
                bodyClasses: this.bodyClasses(),
                data: this.data,
                dict: this.dict
            } );

        } catch ( err ) {

            res.status( 500 ).render( 'base/error', { err } );

        }

    }

}
