import { LogLevel, ServerConfig, ServiceContainer } from '@pseinfo/app/types/index';
import { Server as HttpServer } from 'node:http';
import { Application, NextFunction, Request, Response } from 'express';

export interface IConfig {
    loadConfiguration () : Promise< void >;
    reloadConfiguration () : Promise< void >;
    getENV () : string;
    getConfiguration () : ServerConfig;
    isConfigurationLoaded () : boolean;
    getValue < T = any > ( keyPath: string, defaultValue?: T ) : T;
    server: ServerConfig[ 'server' ];
    static: ServerConfig[ 'static' ];
    i18n: ServerConfig[ 'i18n' ];
    compression: ServerConfig[ 'compression' ];
    rateLimit: ServerConfig[ 'rateLimit' ];
    cookies: ServerConfig[ 'cookies' ];
}

export interface ILogger {
    setLogLevel ( level: LogLevel ) : void;
    setEnabled ( enabled: boolean ) : void;
    isEnabled () : boolean;
    debug ( message: string, ...args: any[] ) : void;
    info ( message: string, ...args: any[] ) : void;
    warn ( message: string, ...args: any[] ) : void;
    error ( message: string, error?: Error | any, ...args: any[] ) : void;
    fatal ( message: string, error?: Error | any, ...args: never[] ) : never;
}

export interface IRouter {}

export interface IServer {
    initialize () : Promise< void >;
    start () : Promise< void >;
    stop () : Promise< void >;
    getApp () : Application;
    getHttpServer () : HttpServer | undefined;
    isRunning () : boolean;
}

export interface IServiceFactory {
    getContainer () : ServiceContainer;
    logger: ILogger;
    config: IConfig;
    router: IRouter;
    server: IServer;
    set < T > ( serviceName: string, service: T ) : void;
    get < T > ( serviceName: string ) : T;
    initializeServices () : Promise< void >;
}

export interface IMiddleware {
    initialize () : Promise< void >;
    execute ( req: Request, res: Response, next: NextFunction ) : Promise< void > | void;
}
