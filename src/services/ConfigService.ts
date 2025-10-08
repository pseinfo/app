import { ServerConfig } from '@pseinfo/app/types/index';
import { IConfig, ILogger } from '@pseinfo/app/types/interfaces';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import deepmerge from 'deepmerge';
import { load } from 'js-yaml';

export class ConfigurationService implements IConfig {

    private readonly _configDir: string;
    private readonly _encoding: BufferEncoding;
    private _env: string;
    private _config: ServerConfig;
    private _isLoaded: boolean = false;
    private _cache: Map< string, any > = new Map();

    constructor ( private logger: ILogger, env?: string, configDir?: string, encoding: BufferEncoding = 'utf8' ) {

        this._configDir = configDir || join( process.cwd(), 'config' );
        this._encoding = encoding;
        this._env = env || process.env.NODE_ENV || 'production';
        this._config = {} as ServerConfig;

    }

    private assertLoaded () : void {

        if ( ! this._isLoaded ) {
            this.logger.fatal( `Configuration not loaded. Call loadConfiguration() first.` );
        }

    }

    public getENV () : string {
        return this._env;
    }

    public getConfiguration () : ServerConfig {

        this.assertLoaded();
        return this._config;

    }

    public isConfigurationLoaded () : boolean {
        return this._isLoaded;
    }

}
