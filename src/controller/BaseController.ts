import { Server } from '@pseinfo/app/core/Server';
import { ControllerOptions, PageData } from '@pseinfo/app/types';
import { NextFunction, Request, Response } from 'express';
import { $Dictionary } from 'i18next/typescript/helpers';

export abstract class BaseController {

    constructor ( protected options: ControllerOptions ) {}

    public get route () : string { return this.options.route }
    public get template () : string { return this.options.template }
    public get meta () : PageData { return this.options.meta ?? {} }
    public get data () : Record< string, any > { return this.options.data ?? {} }
    public get dict () : $Dictionary { return this.options.dict ?? {} }

    public abstract handle ( server: Server, req: Request, res: Response, next: NextFunction ) : Promise< void > | void;

}
