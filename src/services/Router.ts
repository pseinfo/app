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

    public get router () : ExpressRouter { return this._router }
    public get controllers () : Map< string, IController > { return this._controllers }

    public registerController ( controller: IController ) : void {}

    public registerControllers ( controllers: IController[] ) : void {}

    public useMiddleware ( handler: RequestHandler ) : void {

        this._middlewares.push( handler );
        this._router.use( handler );

    }

    public useErrorHandler ( handler: ErrorHandler ) : void {

        this._errorHandlers.push( handler );
        this._router.use( handler );

    }

    public setupErrorHandling () : void {}

    public getController ( route: string ) : IController | undefined {
        return this._controllers.get( route );
    }

    public removeController ( route: string ) : boolean {

        const removed = this._controllers.delete( route );
        if ( removed ) serviceFactory.logger.info( `Controller removed: ${route}` );

        return removed;

    }

    public clearControllers () : void {
        this._controllers.clear();
    }

}
