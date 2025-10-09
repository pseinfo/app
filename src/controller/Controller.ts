import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
import { AssetConfig, ControllerOptions, PageData, RequestMethods } from '@pseinfo/app/types/index';
import { IController } from '@pseinfo/app/types/interfaces';
import { $Dictionary } from 'i18next/typescript/helpers';
import { NextFunction, Request, Response } from 'express';

export abstract class Controller implements IController {

    protected readonly options: ControllerOptions;

    constructor ( options: ControllerOptions ) {
        this.options = options;
    }

    protected handleError ( error: Error, req: Request, res: Response ) : void {

        serviceFactory.logger.error( `Controller error`, error, {
            route: this.route,
            template: this.template,
            url: req.url,
            method: req.method
        } );

        if ( ! res.headersSent ) {

            const production = serviceFactory.config.getENV() === 'production';

            res.status( 500 ).render( 'base/error', {
                error: {
                    message: production ? 'Internal Server Error' : error.message,
                    stack: production ? undefined : error.stack
                }
            } );

        }

    }

    protected sendSuccess ( res: Response, data: any, statusCode: number = 200 ) : void {
        res.status( statusCode ).json( { success: true, data } );
    }

    protected sendError ( res: Response, message: string, statusCode: number = 400 ) : void {
        res.status( statusCode ).json( { success: false, error: message } );
    }

    public get template () : string { return this.options.template }
    public get route () : string { return this.options.route }
    public get methods () : RequestMethods { return this.options.methods }
    public get meta () : PageData | undefined { return this.options.meta }
    public get assets () : Partial< AssetConfig > | undefined { return this.options.assets }
    public get classes () : string[] | undefined { return this.options.classes }
    public get data () : Record< string, any > | undefined { return this.options.data }
    public get dict () : $Dictionary | undefined { return this.options.dict }

    public abstract handle ( req: Request, res: Response, next: NextFunction ) : Promise< void > | void;

}
