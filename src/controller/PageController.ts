import { Controller } from '@pseinfo/app/controller/Controller';
import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
import { AssetConfig, ControllerOptions, GlobalContext, MetaData, RenderOptions } from '@pseinfo/app/types/index';
import { IPageController } from '@pseinfo/app/types/interfaces';
import { NextFunction, Request, Response } from 'express';

export abstract class PageController extends Controller implements IPageController {

    constructor ( options: ControllerOptions ) {
        super( options );
    }

    protected globalContext ( req: Request ) : GlobalContext {

        return {
            i18n: req.t?.bind( req ) || ( ( key: string ) => key ),
            server: serviceFactory.config.server,
            site: {
                originalUrl: req.originalUrl,
                secure: this.securedConnection( req ),
                method: req.method,
                path: req.path,
                query: req.query,
                params: req.params
            }
        };

    }

    protected assetLoader () : AssetConfig {

        const globalAssets = serviceFactory.config.static.assets || {};
        const pageAssets = this.assets || {};

        return {
            js: [ ...new Set( [ ...( globalAssets.js || [] ), ...( pageAssets.js || [] ) ] ) ],
            css: [ ...new Set( [ ...( globalAssets.css || [] ), ...( pageAssets.css || [] ) ] ) ]
        };

    }

    protected bodyClasses () : string {

        const baseClasses = [ 'pt', 'pt-page', `pt-${this.template}` ];
        const pageClasses = this.classes || [];

        return [ ...baseClasses, ...pageClasses ].join( ' ' ).trim();

    }

    protected metaData ( req: Request ) : Required< MetaData > {

        return { ...{
            title: req.t( `${this.template}:title`, this.dict ) || this.template,
            description: req.t( `${this.template}:description`, this.dict ),
            keywords: [],
            canonical: this.canonicalUrl( req ),
            robots: 'index, follow'
        }, ...this.meta };

    }

    public async handle ( req: Request, res: Response, next: NextFunction ) : Promise< void > {

        try {

            const globalContext = this.globalContext( req );
            const cookies = this.cookieContext( req, res );
            const assets = this.assetLoader();
            const classes = this.bodyClasses();
            const meta = this.metaData( req );

            res.status( 200 ).render( this.template, {
                ...globalContext, cookies, assets, classes, meta,
                data: this.data, dict: this.dict
            } as RenderOptions );

            serviceFactory.logger.debug( `Page rendered: ${this.template} for ${req.method} ${req.path}` );

        } catch ( error ) { next( error ) }

    }

}
