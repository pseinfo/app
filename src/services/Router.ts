import { ErrorHandler, RequestHandler } from '@pseinfo/app/types/index';
import { IController, IRouter } from '@pseinfo/app/types/interfaces';
import { Router as ExpressRouter } from 'express';
import { serviceFactory } from './ServiceFactory';

export class Router implements IRouter {

    private _router: ExpressRouter;
    private _controllers: Map< string, IController > = new Map();
    private _middlewares: Array< RequestHandler > = [];
    private _errorHandlers: Array< ErrorHandler > = [];

    constructor () {
        this._router = ExpressRouter();
    }

    public registerController ( controller: IController ) : void {}

    public registerControllers ( controller: IController[] ) : void {}

    public useMiddleware ( handler: RequestHandler ) : void {

        this._middlewares.push( handler );
        this._router.use( handler );

    }

    public useErrorHandler ( handler: ErrorHandler ) : void {

        this._errorHandlers.push( handler );
        this._router.use( handler );

    }

}
