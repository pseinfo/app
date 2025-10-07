import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { ControllerOptions, GlobalContext } from '@pseinfo/app/types';
import { Request, Response } from 'express';

export abstract class PageController extends BaseController {

    constructor ( options: ControllerOptions ) { super( options ) }

    private getGlobalContext ( server: Server, req: Request ) : GlobalContext {

        return {
            i18n: req.t.bind( req ),
            server: server.cfg.cfg.server,
            site: {
                originalUrl: req.originalUrl,
                path: req.path,
                query: req.query,
                params: req.params
            }
        };

    }

    public handle ( server: Server, req: Request, res: Response ) : void {

        res.render( this.template, {
            ...this.getGlobalContext( server, req ),
            data: this.data
        } );

    }

}
