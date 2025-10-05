import express, { Application } from 'express';

export class Server {

    private readonly expressApp: Application;

    public get app () : Application { return this.expressApp }

    constructor () {

        this.expressApp = express();

    }

    public async start () : Promise< void > {}

}
