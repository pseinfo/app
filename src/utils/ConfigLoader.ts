import { ServerConfig } from '@pseinfo/app/types';
import {} from 'node:fs/promises';
import { join } from 'node:path';
import {} from 'js-yaml';

export class ConfigLoader {

    private readonly _configDir: string;
    private _env: string;
    private _config: ServerConfig;
    private _isLoaded: boolean = false;

    constructor ( env?: string, configDir?: string ) {

        this._configDir = configDir || join( process.cwd(), 'config' );
        this._env = env || process.env.NODE_ENV || 'production';
        this._config = {} as ServerConfig;

    }

    public get env () : string { return this._env }

    public get cfg () : ServerConfig {

        if ( ! this._isLoaded ) throw new Error ( 'Configuration not loaded. Call loadConfig() first.' );
        return this._config;

    }

}
