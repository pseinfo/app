import { Controller } from '@pseinfo/app/controller/Controller';
import { ControllerOptions } from '@pseinfo/app/types/index';
import { IPageController } from '@pseinfo/app/types/interfaces';
import { NextFunction, Request, Response } from 'express';

export abstract class PageController extends Controller implements IPageController {

    constructor ( options: ControllerOptions ) {
        super( options );
    }

    public async handle ( req: Request, res: Response, next: NextFunction ) : Promise< void > {}

}
