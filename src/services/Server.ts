import { I18n } from '@pseinfo/app/middleware/I18n';
import { serviceFactory } from '@pseinfo/app/services/ServiceFactory';
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

    public async initialize () : Promise< void > {

        serviceFactory.logger.debug( `Initializing server ...` );

        try {

            // Configure middleware
            await this.configureMiddleware();

            // Configure views
            this.configureViews();

            // Configure static file serving
            this.configureStaticFiles();

        } catch ( error ) {
            serviceFactory.logger.error( `Server initialization error`, error );
        }

    }

}
