import { controller } from '@pseinfo/app/controller/index';
import { ConfigLoader } from '@pseinfo/app/core/ConfigLoader';
import { Router } from '@pseinfo/app/core/Router';
import { configureI18n, i18nMiddleware } from '@pseinfo/app/middleware/i18n';
import { Debugger } from '@pseinfo/app/utils/Debugger';
import { Server as HttpServer } from 'node:http';
import { join } from 'node:path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express, { static as serveStatic, Application } from 'express';
import { rateLimit } from 'express-rate-limit';

export class Server {

    private _config: ConfigLoader;
    private _debugger: Debugger;
    private _router: Router;
    private _app: Application;
    private _server?: HttpServer;

    public get cfg () : ConfigLoader { return this._config }
    public get router () : Router { return this._router }
    public get app () : Application { return this._app }
    public get server () : HttpServer | undefined { return this._server }

    constructor () {

        this._config = new ConfigLoader();
        this._debugger = new Debugger( this._config.cfg.server.debug );
        this._router = new Router( this );
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
            catch ( err ) { this._debugger.exit( `Cannot serve statics from ${ key }`, err ) }

        }

    }

    private configureRoutes () : void {

        this._router.registerControllers( controller );
        this._app.use( '/', this._router.router );

    }

    private initEventHandlers () : void {

        process.on( 'SIGTERM', this.stop.bind( this ) );

    }

    public async init () : Promise< void > {

        await this._config.loadConfig();
        await this.configureMiddleware();
        this.configureViews();
        this.serveStatics();
        this.configureRoutes();
        this.initEventHandlers();

    }

    public start () : Promise< void > {

        const { port, host, secure } = this._config.cfg.server;

        return new Promise( ( resolve, reject ) => {

            this._server = this.app.listen( port, host, ( err?: Error ) => {

                if ( err ) reject( err );
                else {

                    this._debugger.log( `Server is running on port: ${ port }`, true );
                    this._debugger.log( `Serving host: ${ host }` );
                    this._debugger.log( `HTTPS enabled: ${ secure ? 'yes' : 'no' }` );
                    this._debugger.log( `Debugger enabled: ${ this._debugger.enabled ? 'yes' : 'no' }` );
                    resolve();

                }

            } );

        } );

    }

    public stop () : void {

        this._debugger.warn( `Server is shutting down`, true );
        this._server?.close();

    }

}
