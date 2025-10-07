import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { Router as ExpressRouter, NextFunction, Request, Response } from 'express';

export class Router {

    private readonly _router: ExpressRouter;

    public get router () : ExpressRouter { return this._router }

    constructor ( private server: Server ) { this._router = ExpressRouter() }

    public registerController ( controller: BaseController ) : void {

        const route = controller.route;
        const handler = ( req: Request, res: Response, next: NextFunction ) => controller.handle( this.server, req, res, next );

        this._router.get( route, handler );
        this._router.post( route, handler );

    }

    public registerControllers ( controllers: BaseController[] ) : void {

        for ( const controller of controllers ) this.registerController( controller );

    }

}
