import { ServerConfig, ServiceContainer } from '@pseinfo/app/types/index';

export interface IServiceFactory {
    getContainer () : ServiceContainer;
    logger: ILogger;
    config: IConfig;
    set < T > ( serviceName: string, service: T ) : void;
    get < T > ( serviceName: string ) : T;
    initializeServices () : Promise< void >;
}

export interface IConfig {
    loadConfiguration () : Promise< void >;
    reloadConfiguration () : Promise< void >;
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
    debug ( message: string, ...args: any[] ) : void;
    info ( message: string, ...args: any[] ) : void;
    warn ( message: string, ...args: any[] ) : void;
    error ( message: string, error?: Error | any, ...args: any[] ) : void;
    fatal ( message: string, error?: Error | any, ...args: never[] ) : never;
    setEnabled ( enabled: boolean ) : void;
    isEnabled () : boolean;
}
