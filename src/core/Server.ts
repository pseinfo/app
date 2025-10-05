import { ServerConfig } from '../types';
import { config } from 'dotenv';
import express, { Application } from 'express';

export class Server {

    private readonly env: 'prod' | 'dev';
    private readonly debug: boolean;
    private readonly config: ServerConfig;
    private readonly app: Application;

    constructor () {

        this.env = process.env.NODE_ENV as Server[ 'env' ] || 'prod';
        this.debug = !! process.env.DEBUG;
        this.config = config( {
            path: [ `config/${this.env}.env`, `config/default.env` ],
            debug: this.debug
        } ) as ServerConfig;

        this.app = express();

    }

    public getApp () : Application { return this.app }

    public async start () : Promise< void > {

        const { SERVER_HOST, SERVER_PORT } = this.config;

    }

}
