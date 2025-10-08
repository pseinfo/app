import { ServerConfig } from '@pseinfo/app/types';

export interface IConfig {
    loadConfiguration () : Promise< void >;
    getValue< T = any >( keyPath: string, defaultValue?: T ) : T;
    reloadConfiguration () : Promise< void >;
    getConfiguration () : ServerConfig;
    isConfigurationLoaded () : boolean;
}
