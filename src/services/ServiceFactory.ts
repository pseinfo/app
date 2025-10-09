import { ConfigurationService } from '@pseinfo/app/services/ConfigService';
import { LoggerService } from '@pseinfo/app/services/LoggerService';
import { ServiceContainer } from '@pseinfo/app/types/index';
import { IConfig, ILogger } from '@pseinfo/app/types/interfaces';

export class ServiceFactory {

    private static _instance: ServiceFactory;
    private _services: Map< string, any > = new Map();
    private _container: ServiceContainer;

    private constructor () {
        this._container = this.createServices();
    }

    public static getInstance () : ServiceFactory {
        return ServiceFactory._instance &&= new ServiceFactory();
    }

    private createServices () : ServiceContainer {

        const logger = new LoggerService( true, 'PSEServer' );
        const config = new ConfigurationService();

        return { logger, config };

    }

    public getContainer () : ServiceContainer {
        return this._container;
    }

    public get logger () : ILogger { return this._container.logger }
    public get config () : IConfig { return this._container.config }

    public set < T > ( serviceName: string, service: T ) : void {
        this._services.set( serviceName, service );
    }

    public get < T > ( serviceName: string ) : T {
        return this._services.get( serviceName ) as T;
    }

}

export const serviceFactory = ServiceFactory.getInstance();
