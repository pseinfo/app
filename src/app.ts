import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';

export class PSEApplication {

    private static _instance: PSEApplication;
    private _initialized: boolean = false;

    private constructor () {}

    public static getInstance () : PSEApplication {
        return PSEApplication._instance ||= new PSEApplication();
    }

    public async initialize () : Promise< void > {

        if ( this._initialized ) {
            serviceFactory.logger.warn( `Application is already initialized.` );
            return;
        }

        serviceFactory.logger.debug( `Initialize services ...` );

        await serviceFactory.initializeServices();
        this._initialized = true;

    }

    public async start () : Promise< void > {

        if ( ! this._initialized ) {
            await this.initialize();
        }

        try {

            serviceFactory.logger.info( `Starting PSE Server ...` );
            await serviceFactory.server.start();

        } catch ( error ) {
            serviceFactory.logger.fatal( `Failed to start server`, error );
        }

    }

    public async stop () : Promise< void > {

        try {

            serviceFactory.logger.info( `Stopping PSE Server ...` );
            await serviceFactory.server.stop();

        } catch ( error ) {
            serviceFactory.logger.fatal( `Failed to stop server`, error );
        }

    }

    public isInitialized () : boolean {
        return this._initialized;
    }

}

// global singleton instance
export const app = PSEApplication.getInstance();
