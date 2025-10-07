import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { ControllerOptions } from '@pseinfo/app/types';
import { Request, Response, NextFunction } from 'express';

export abstract class PageController extends BaseController {

    constructor ( options: ControllerOptions ) { super( options ) }

    public handle ( server: Server, req: Request, res: Response, next: NextFunction ) : void {

        res.render( this.template, {} );

    }

}
