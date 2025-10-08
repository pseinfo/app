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

    private async loadConfigFile ( filename: string, optional: boolean = false ) : Promise< Partial< ServerConfig > | undefined > {

        const filePath = join( this._configDir, filename );

        try {

            await access( filePath );

            const fileContent = await readFile( filePath, { encoding: this._encoding } );
            const parsedConfig = load( fileContent ) as any;

            if ( ! parsedConfig || typeof parsedConfig !== 'object' ) {
                this.logger.fatal( `Invalid configuration format in ${filename}` );
            }

            return parsedConfig as Partial< ServerConfig >;

        } catch ( error ) {

            if ( error instanceof Error && 'code' in error && error.code === 'ENOENT' ) {
                if ( optional ) return {};
                else this.logger.fatal( `Required configuration file not found: ${filePath}`, error );
            }

            this.logger.fatal( `Error loading ${filename}`, error );

        }

    }

    public async loadConfiguration () : Promise< void > {

        try {

            const defaultConfig = await this.loadConfigFile( 'default.yml' );
            const envConfig = await this.loadConfigFile( `${this._env}.yml`, true );

            this._config = deepmerge( defaultConfig ?? {}, envConfig ?? {} );
            this._isLoaded = true;
            this._cache.clear();

        } catch ( error ) {

            this.logger.fatal( `Failed to load configuration`, error );

        }

    }

    public async reloadConfiguration () : Promise< void > {

        this._isLoaded = false;
        this._cache.clear();

        await this.loadConfiguration();

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

    public getValue< T = any >( keyPath: string, defaultValue?: T ) : T {

        this.assertLoaded();

        if ( this._cache.has( keyPath ) ) {
            return this._cache.get( keyPath );
        }

        const keys = keyPath.split( '.' );
        let current: any = this._config;

        for ( const key of keys ) {

            if ( current && typeof current === 'object' && key in current ) {

                current = current[ key ];

            } else {

                const result = defaultValue as T;
                this._cache.set( keyPath, result );
                return result;

            }

        }

        this._cache.set( keyPath, current );
        return current as T;

    }

}
