import { ErrorHandler, RequestHandler } from '@pseinfo/app/types/index';
import { IController, IRouter } from '@pseinfo/app/types/interfaces';
import { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
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

    public getController ( route: string ) : IController | undefined {
        return this._controllers.get( route );
    }

    public registerController ( controller: IController ) : void {

        const route = controller.route;
        const template = controller.template;
        const methods = controller.methods;
        let success = false;

        if ( this._controllers.has( route ) ) {
            serviceFactory.logger.warn( `Controller for route '${route}' already registered, overwriting` );
        }

        methods.forEach( method => {

            if ( ! [ 'get', 'post' ].includes( method.toLowerCase() ) ) {
                serviceFactory.logger.warn( `Unsupported method '${method}' for route '${route}'` );
                return;
            }

            this._router[ method ]( route, controller.handle.bind( controller ) );
            success = true;

        } );

        if ( success ) {

            this._controllers.set( route, controller );
            serviceFactory.logger.info( `Controller registered: ${route} -> ${template}` );

        } else {

            serviceFactory.logger.error( `Failed to register controller for route '${route}'` );

        }

    }

    public registerControllers ( controllers: IController[] ) : void {
        controllers.forEach( controller => this.registerController( controller ) );
    }

    public useMiddleware ( handler: RequestHandler ) : void {

        this._middlewares.push( handler );
        this._router.use( handler );

    }

    public useErrorHandler ( handler: ErrorHandler ) : void {

        this._errorHandlers.push( handler );
        this._router.use( handler );

    }

    public setupErrorHandling () : void {}

    public removeController ( route: string ) : boolean {

        const removed = this._controllers.delete( route );
        if ( removed ) serviceFactory.logger.info( `Controller removed: ${route}` );

        return removed;

    }

    public clearControllers () : void {
        this._controllers.clear();
    }

}
