import { ConfigLoader } from '@pseinfo/app/core/ConfigLoader';
import { Router } from '@pseinfo/app/core/Router';
import { configureI18n, i18nMiddleware } from '@pseinfo/app/middleware/i18n';
import { Server as HttpServer } from 'node:http';
import { join } from 'node:path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express, { static as serveStatic, Application } from 'express';
import { rateLimit } from 'express-rate-limit';

export class Server {

    private _config: ConfigLoader;
    private _router: Router;
    private _app: Application;
    private _server?: HttpServer;

    public get cfg () : ConfigLoader { return this._config }
    public get router () : Router { return this._router }
    public get app () : Application { return this._app }
    public get server () : HttpServer | undefined { return this._server }

    constructor () {

        this._config = new ConfigLoader();
        this._router = new Router();
        this._app = express();

    }

    private async configureMiddleware () : Promise< void > {

        this._app.use( cookieParser() );
        this._app.use( compression( this._config.cfg.compression ?? {} ) );
        this._app.use( rateLimit( this._config.cfg.rateLimit ?? {} ) );

        await configureI18n( this._config.cfg );
        this._app.use( i18nMiddleware );

    }

    private configureViews () : void {

        this.app.set( 'view engine', 'pug');
        this.app.set( 'views', 'views' );

    }

    private serveStatics () : void {

        const { options, paths } = this._config.cfg.static;
        const cwd = process.cwd();

        for ( const [ key, path ] of Object.entries( paths ) ) {

            try { this.app.use( `/${ key }`, serveStatic( join( cwd, path ), options ) ) }
            catch ( err ) { throw new Error( `Cannot serve statics from ${ key }: ${
                err instanceof Error ? err.message : 'Unknown error'
            }` ) }

        }

    }

    private initEventHandlers () : void {

        process.on( 'SIGTERM', this.stop.bind( this ) );

    }

    public async init () : Promise< void > {

        await this._config.loadConfig();
        await this.configureMiddleware();
        this.configureViews();
        this.serveStatics();
        this.initEventHandlers();

    }

    public start () : Promise< void > {

        const { port, host } = this._config.cfg.server;

        return new Promise( ( resolve, reject ) => {

            this._server = this.app.listen( port, host, ( err?: Error ) => {

                if ( err ) reject( err );
                else resolve();

            } );

        } );

    }

    public stop () : void { this._server?.close() }

}
