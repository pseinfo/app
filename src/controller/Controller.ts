import { AssetConfig, ControllerOptions, PageData, RequestMethods } from '@pseinfo/app/types/index';
import { IController } from '@pseinfo/app/types/interfaces';
import { $Dictionary } from 'i18next/typescript/helpers';

export abstract class Controller implements IController {

    protected readonly options: ControllerOptions;

    constructor ( options: ControllerOptions ) {
        this.options = options;
    }

    public get template () : string { return this.options.template }
    public get route () : string { return this.options.route }
    public get methods () : RequestMethods { return this.options.methods }
    public get meta () : PageData | undefined { return this.options.meta }
    public get assets () : Partial< AssetConfig > | undefined { return this.options.assets }
    public get classes () : string[] | undefined { return this.options.classes }
    public get data () : Record< string, any > | undefined { return this.options.data }
    public get dict () : $Dictionary | undefined { return this.options.dict }

}
