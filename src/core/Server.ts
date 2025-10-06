import { ConfigLoader } from '@pseinfo/app/core/ConfigLoader';
import { Router } from '@pseinfo/app/core/Router';
import { configureI18n, i18nMiddleware } from '@pseinfo/app/middleware/i18n';
import { Server as HttpServer } from 'node:http';
import express, { Application } from 'express';

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

        await configureI18n( this._config.cfg );
        this._app.use( i18nMiddleware );

    }

    private configureViews () : void {

        this.app.set( 'view engine', 'pug');
        this.app.set( 'views', 'views' );

    }

    public async init () : Promise< void > {

        await this._config.loadConfig();
        await this.configureMiddleware();
        this.configureViews();

    }

    public start () : Promise< void > {

        const { port, host } = this._config.cfg.server;

        return new Promise( ( resolve, reject ) => {

            this._server = this.app.listen( port, host, ( err?: Error ) => {

                if ( err ) reject( err );
                else resolve();

            } );

            process.on( 'SIGTERM', this.stop.bind( this ) );

        } );

    }

    public stop () : void { this._server?.close() }

}
