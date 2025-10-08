import { ServerConfig } from '@pseinfo/app/types/index';

export interface IConfig {
    loadConfiguration () : Promise< void >;
    reloadConfiguration () : Promise< void >;
    getConfiguration () : ServerConfig;
    isConfigurationLoaded () : boolean;
    getValue< T = any >( keyPath: string, defaultValue?: T ) : T;
    getServerConfig () : ServerConfig[ 'server' ];
    getStaticConfig () : ServerConfig[ 'static' ];
    getI18nConfig () : ServerConfig[ 'i18n' ];
    getCompressionConfig () : ServerConfig[ 'compression' ];
    getRateLimitConfig () : ServerConfig[ 'rateLimit' ];
    getCookiesConfig () : ServerConfig[ 'cookies' ];
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
