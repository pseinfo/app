import { IServer } from '@pseinfo/app/types/interfaces';
import { Server as HttpServer } from 'node:http';
import express, { Application } from 'express';

export class Server implements IServer {

    private _app: Application;
    private _server?: HttpServer;
    private _isRunning: boolean = false;

    constructor () {
        this._app = express();
    }

}
