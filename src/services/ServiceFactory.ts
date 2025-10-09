import { ConfigurationService } from '@pseinfo/app/services/ConfigService';
import { LoggerService } from '@pseinfo/app/services/LoggerService';
import { ServiceContainer } from '@pseinfo/app/types/index';
import { IConfigService, ILoggerService, IServiceFactory } from '@pseinfo/app/types/interfaces';

export class ServiceFactory implements IServiceFactory {

    private static _instance: ServiceFactory;
    private _services: Map< string, any > = new Map();
    private _container: ServiceContainer;

    public static getInstance () : IServiceFactory {
        return ServiceFactory._instance &&= new ServiceFactory();
    }

    private constructor () {
        this._container = this.createServices();
    }

    private createServices () : ServiceContainer {

        const logger = new LoggerService();
        const config = new ConfigurationService();

        return { logger, config };

    }

    public getContainer () : ServiceContainer {
        return this._container;
    }

    public get logger () : ILoggerService { return this._container.logger }
    public get config () : IConfigService { return this._container.config }

    public set < T > ( serviceName: string, service: T ) : void {
        this._services.set( serviceName, service );
    }

    public get < T > ( serviceName: string ) : T {
        return this._services.get( serviceName ) as T;
    }

    public async initializeServices () : Promise< void > {

        const { logger, config } = this._container;

        try {

            await config.loadConfiguration();
            logger.setEnabled( config.getValue< boolean >( 'server.debug', false ) );

        } catch ( error ) {

            logger.fatal( `Failed to initialize services`, error );

        }

    }

}

export const serviceFactory = ServiceFactory.getInstance();
