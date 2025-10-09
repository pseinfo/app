import { configureI18n, i18nMiddleware } from '@pseinfo/app/middleware/I18n';
import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
import { HealthStatus } from '@pseinfo/app/types/index';
import { IServer } from '@pseinfo/app/types/interfaces';
import { Server as HttpServer } from 'node:http';
import { join } from 'node:path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { static as serveStatic, Application } from 'express';
import rateLimit from 'express-rate-limit';

export class Server implements IServer {

    private _app: Application;
    private _server?: HttpServer;
    private _isRunning: boolean = false;

    constructor () {
        this._app = express();
    }

    private async configureMiddleware () : Promise< void > {

        serviceFactory.logger.debug( `Configuring middleware ...` );

        // Security and parsing middleware
        this._app.use( cookieParser() );
        this._app.use( express.json() );
        this._app.use( express.urlencoded( { extended: true } ) );

        // Compression
        this._app.use( compression( serviceFactory.config.compression || {} ) );

        // Rate limiting
        this._app.use( rateLimit( serviceFactory.config.rateLimit ) );

        // Internationalization
        await configureI18n();
        this._app.use( i18nMiddleware );

    }

    private configureViews () : void {

        serviceFactory.logger.debug( `Configuring views ...` );

        this._app.set( 'view engine', 'pug' );
        this._app.set( 'views', 'views' );

    }

    private configureStaticFiles () : void {

        serviceFactory.logger.debug( `Configuring static file serving ...` );

        const { options, paths } = serviceFactory.config.static;
        const cwd = process.cwd();

        for ( const [ key, path ] of Object.entries( paths ) ) {

            try {

                const staticPath = join( cwd, path as string );
                this._app.use( `/${key}`, serveStatic( staticPath, options ) );
                serviceFactory.logger.debug( `Static files served from /${key} -> ${staticPath}` );

            } catch ( error ) {
                serviceFactory.logger.error( `Cannot serve static files from ${key}`, error );
            }

        }

    }

    private setupGracefulShutdown () : void {

        const gracefulShutdown = ( signal: string ) : void => {

            serviceFactory.logger.debug( `Received ${signal}, shutting down gracefully ...` );

            this.stop().then( () => process.exit( 0 ) ).catch( ( error ) => {
                serviceFactory.logger.fatal( `Error during shutdown`, error );
            } );

        };

        process.on( 'SIGTERM', () => gracefulShutdown( 'SIGTERM' ) );
        process.on( 'SIGINT', () => gracefulShutdown( 'SIGINT' ) );
        process.on( 'SIGUSR2', () => gracefulShutdown( 'SIGUSR2' ) );

    }

    public async initialize () : Promise< void > {

        serviceFactory.logger.debug( `Initializing server ...` );

        try {

            // Configure middleware
            await this.configureMiddleware();

            // Configure views
            this.configureViews();

            // Configure static file serving
            this.configureStaticFiles();

            // Setup graceful shutdown
            this.setupGracefulShutdown();

        } catch ( error ) {
            serviceFactory.logger.error( `Server initialization error`, error );
        }

    }

    public async start () : Promise< void > {

        if ( this._isRunning ) {
            serviceFactory.logger.warn( `Server is already running` );
            return;
        }

        const { port, host, secure, debug } = serviceFactory.config.server;

        return new Promise( ( resolve, reject ) => {

            this._server = this._app.listen( port, host, ( error?: Error ) => {

                if ( error ) {

                    serviceFactory.logger.error( `Failed to start server`, error );
                    reject( error );

                } else {

                    this._isRunning = true;
                    serviceFactory.logger.info( `Server started successfully` );
                    serviceFactory.logger.debug( `Server running on ${host}:${port}` );
                    serviceFactory.logger.debug( `HTTPS enabled: ${ secure ? 'yes' : 'no' }` );
                    serviceFactory.logger.debug( `Environment: ${ serviceFactory.config.getENV() }` );
                    serviceFactory.logger.debug( `Debug mode: ${ debug ? 'enabled' : 'disabled' }` );
                    resolve();

                }

            } );

        } );

    }

    public async stop () : Promise< void > {

        if ( ! this._isRunning ) {
            serviceFactory.logger.warn( `Server is not running` );
            return;
        }

        return new Promise( ( resolve, reject ) => {

            if ( this._server ) {

                this._server.close( ( error ) => {

                    if ( error ) {

                        serviceFactory.logger.error( `Error stopping server`, error );
                        reject( error );

                    } else {

                        this._isRunning = false;
                        serviceFactory.logger.info( `Server stopped successfully` );
                        resolve();

                    }

                } );

            } else {

                this._isRunning = false;
                resolve();

            }

        } );

    }

    public getApp () : Application {
        return this._app;
    }

    public getHttpServer () : HttpServer | undefined {
        return this._server;
    }

    public isRunning () : boolean {
        return this._isRunning;
    }

    public getHealthStatus () : HealthStatus {

        const { heapTotal, heapUsed, external } = process.memoryUsage();

        return {
            status: this.isRunning() ? 'running' : 'stopped',
            timestamp: new Date().toISOString(),
            env: serviceFactory.config.getENV(),
            uptime: process.uptime(),
            memory: {
                used: heapUsed,
                total: heapTotal,
                external
            },
            pid: process.pid,
            version: process.version
        };

    }

}
