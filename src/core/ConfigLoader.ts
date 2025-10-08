import { Server } from '@pseinfo/app/core/Server';
import { ServerConfig } from '@pseinfo/app/types';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import deepmerge from 'deepmerge';
import { load } from 'js-yaml';

export class ConfigLoader {

    private readonly _configDir: string;
    private readonly _encoding: BufferEncoding;
    private _env: string;
    private _config: ServerConfig;
    private _isLoaded: boolean = false;

    public get env () : string { return this._env }
    public get cfg () : ServerConfig { this.assertLoaded(); return this._config }
    public get isLoaded () : boolean { return this._isLoaded }

    constructor ( private server: Server, env?: string, configDir?: string, encoding?: BufferEncoding ) {

        this._configDir = configDir || join( process.cwd(), 'config' );
        this._encoding = encoding || 'utf8';
        this._env = env || process.env.NODE_ENV || 'production';
        this._config = {} as ServerConfig;

    }

    private assertLoaded () : void { if ( ! this._isLoaded ) this.server.debug.exit( `Configuration not loaded. Call loadConfig() first.` ) }

    private async loadConfigFile ( filename: string, optional: boolean = false ) : Promise< ServerConfig | undefined > {

        const filePath = join( this._configDir, filename );

        try {

            await access( filePath );

            const fileContent = await readFile( filePath, { encoding: this._encoding } );
            const parsedConfig = load( fileContent ) as ServerConfig;

            if ( ! parsedConfig || typeof parsedConfig !== 'object' ) this.server.debug.exit( `Invalid configuration format in ${filename}` );
            return parsedConfig;

        } catch ( err ) {

            if ( err instanceof Error && 'code' in err && err.code === 'ENOENT' ) {

                if ( optional ) return {} as ServerConfig;
                else this.server.debug.exit( `Required configuration file not found: ${filePath}` );

            }

            this.server.debug.exit( `Error loading ${filename}`, err );

        }

    }

    public async loadConfig () : Promise< void > {

        try {

            const defConfig = await this.loadConfigFile( 'default.yml' );
            const envConfig = await this.loadConfigFile( `${this._env}.yml`, true );

            this._config = deepmerge( defConfig!, envConfig! );
            this._isLoaded = true;

        } catch ( err ) { this.server.debug.exit( `Failed to load configuration`, err ) }

    }

    public async reloadConfig () : Promise< void > {

        this._isLoaded = false;
        await this.loadConfig();

    }

    public getConfigValue< T = any > ( keyPath: string, defaultValue?: T ) : T {

        this.assertLoaded();

        const keys = keyPath.split( '.' );
        let current: any = this._config;

        for ( const key of keys ) {

            if ( current && typeof current === 'object' && key in current ) current = current[ key ];
            else return defaultValue as T;

        }

        return current as T;

    }

}
