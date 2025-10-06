import { ConfigLoader } from '@pseinfo/app/core/ConfigLoader';
import { Router } from '@pseinfo/app/core/Router';
import express, { Application } from 'express';

export class Server {

    private config: ConfigLoader;
    private router: Router;
    private expressApp: Application;

    constructor () {

        this.config = new ConfigLoader();
        this.router = new Router();
        this.expressApp = express();

    }

    public async init () : Promise< void > {

        await this.config.loadConfig();

    }

    public start () : void {}

    public stop () : void {}

}
