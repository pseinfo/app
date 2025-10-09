import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';

export class PSEApplication {

    private static _instance: PSEApplication;
    private _initialized: boolean = false;

    private constructor () {}

    public static getInstance () : PSEApplication {
        return PSEApplication._instance ||= new PSEApplication();
    }

    public async initialize () : Promise< void > {

        await serviceFactory.initializeServices();
        this._initialized = true;

    }

    public async start () : Promise< void > {}

    public async stop () : Promise< void > {}

    public isInitialized () : boolean {
        return this._initialized;
    }

}

export const app = PSEApplication.getInstance();
