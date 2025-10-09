import { Controller } from '@pseinfo/app/controller/Controller';
import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
import { ControllerOptions, GlobalContext } from '@pseinfo/app/types/index';
import { IPageController } from '@pseinfo/app/types/interfaces';
import { NextFunction, Request, Response } from 'express';

export abstract class PageController extends Controller implements IPageController {

    constructor ( options: ControllerOptions ) {
        super( options );
    }

    protected buildGlobalContext ( req: Request ) : GlobalContext {

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
            },
            meta: {
                canonical: this.canonicalUrl( req ),
                robots: 'index, follow'
            }
        };

    }

    public async handle ( req: Request, res: Response, next: NextFunction ) : Promise< void > {

        try {

            const globalContext = this.buildGlobalContext( req );
            const cookies = this.cookieContext( req, res );

            res.status( 200 ).render( this.template, {
                ...globalContext, cookies,
                meta: { ...globalContext.meta },
                data: this.data, dict: this.dict
            } );

            serviceFactory.logger.debug( `Page rendered: ${this.template} for ${req.method} ${req.path}` );

        } catch ( error ) {
            this.handleError( error as Error, req, res );
            next( error );
        }

    }

}
