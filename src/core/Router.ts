import { BaseController } from '@pseinfo/app/controller/BaseController';
import { Server } from '@pseinfo/app/core/Server';
import { Router as ExpressRouter } from 'express';

export class Router {

    private readonly _router: ExpressRouter;

    public get router () : ExpressRouter { return this._router }

    constructor ( private server: Server ) { this._router = ExpressRouter() }

    public registerController ( controller: BaseController ) : void {}

    public registerControllers ( controllers: BaseController[] ) : void {

        for ( const controller in controllers ) this.registerController( controller );

    }

}
