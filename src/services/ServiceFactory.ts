import { Config } from '@pseinfo/app/services/Config';
import { Logger } from '@pseinfo/app/services/Logger';
import { Router } from '@pseinfo/app/services/Router';
import { Server } from '@pseinfo/app/services/Server';
import { ServiceContainer } from '@pseinfo/app/types/index';
import { IConfig, ILogger, IRouter, IServer, IServiceFactory } from '@pseinfo/app/types/interfaces';

export class ServiceFactory implements IServiceFactory {

    private static _instance: ServiceFactory;
    private _services: Map< string, any > = new Map();
    private _container: ServiceContainer;

    public static getInstance () : IServiceFactory {
        return ServiceFactory._instance ||= new ServiceFactory();
    }

    private constructor () {
        this._container = this.createServices();
    }

    private createServices () : ServiceContainer {

        const logger = new Logger();
        const config = new Config();
        const router = new Router();
        const server = new Server();

        return { logger, config, router, server };

    }

    public getContainer () : ServiceContainer {
        return this._container;
    }

    public get logger () : ILogger { return this._container.logger }
    public get config () : IConfig { return this._container.config }
    public get router () : IRouter { return this._container.router }
    public get server () : IServer { return this._container.server }

    public set < T > ( serviceName: string, service: T ) : void {
        this._services.set( serviceName, service );
    }

    public get < T > ( serviceName: string ) : T {
        return this._services.get( serviceName ) as T;
    }

    public async initializeServices () : Promise< void > {

        const { logger, config, server } = this._container;

        try {

            // Load server configuration
            await config.loadConfiguration();

            // Configure logger based on loaded settings
            logger.setEnabled( config.server.debug );
            logger.setLogLevel( config.server.logLevel );

            // Initialize the server instance
            await server.initialize();

        } catch ( error ) {
            logger.fatal( `Failed to initialize services`, error );
        }

    }

}

export const serviceFactory = ServiceFactory.getInstance();
