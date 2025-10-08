import { ServerConfig } from '@pseinfo/app/types/index';

export interface IConfig {
    loadConfiguration () : Promise< void >;
    reloadConfiguration () : Promise< void >;
    getConfiguration () : ServerConfig;
    isConfigurationLoaded () : boolean;
    getValue< T = any >( keyPath: string, defaultValue?: T ) : T;
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
