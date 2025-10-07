import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Router as ExpressRouter } from 'express';

export class Router {

    private readonly _router: ExpressRouter;

    public get router () : ExpressRouter { return this._router }

    constructor () { this._router = ExpressRouter() }

    public registerController ( controller: BaseController ) : void {

        const route = controller.getRoute();
        const handler = controller.handle.bind( controller );

        this.router.get( route, handler );
        this.router.post( route, handler );

    }

    public registerControllers ( controllers: BaseController[] ) : void {

        for ( const controller in controllers ) this.registerController( controller );

    }

}
