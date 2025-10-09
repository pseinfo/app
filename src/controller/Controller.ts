import { ControllerOptions } from '@pseinfo/app/types/index';
import { IController } from '@pseinfo/app/types/interfaces';

export abstract class Controller implements IController {

    protected readonly options: ControllerOptions;

    constructor ( options: ControllerOptions ) {
        this.options = options;
    }

}
