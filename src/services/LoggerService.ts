import { LogLevel } from '@pseinfo/app/types/index';
import { ILogger } from '@pseinfo/app/types/interfaces';
import { inspect } from 'node:util';

export class LoggerService implements ILogger {

    private _enabled: boolean = true;
    private _logLevel: LogLevel = 'info';
    private _context: string = 'PSEServer';

    constructor ( enabled: boolean = true, context: string = 'PSEServer' ) {

        this._enabled = enabled;
        this._context = context;

    }

    private shouldLog ( level: LogLevel ) : boolean {

        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        return levels[ level ] >= levels[ this._logLevel ];

    }

    private formatMessage ( level: string, message: string, ...args: any[] ) : string {

        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ` ${ args.map( arg => 
            typeof arg === 'object' ? inspect( arg, { depth: 2 } ) : String( arg )
        ).join( ' ' ) }` : '';

        return `[${timestamp}] [${level}] [${this._context}] ${message}${formattedArgs}`;

    }

    public setLogLevel ( level: LogLevel ) : void {
        this._logLevel = level;
    }

    public setEnabled ( enabled: boolean ) : void {
        this._enabled = enabled;
    }

    public isEnabled () : boolean {
        return this._enabled;
    }

    public debug ( message: string, ...args: any[] ) : void {

        if ( this._enabled && this.shouldLog( 'debug' ) ) {
            console.debug( this.formatMessage( 'DEBUG', message, ...args ) );
        }

    }

    public info ( message: string, ...args: any[] ) : void {

        if ( this._enabled && this.shouldLog( 'info' ) ) {
            console.info( this.formatMessage( 'INFO', message, ...args ) );
        }

    }

    public warn ( message: string, ...args: any[] ) : void {

        if ( this._enabled && this.shouldLog( 'warn' ) ) {
            console.warn( this.formatMessage( 'WARN', message, ...args ) );
        }

    }

    public error ( message: string, error?: Error | any, ...args: any[] ) : void {

        if ( this._enabled ) {

            const errorMessage = error instanceof Error 
                ? `${message}: ${error.message}\n${error.stack}`
                : `${message}: ${error}`;

            console.error( this.formatMessage( 'ERROR', errorMessage, ...args ) );

        }

    }

    public fatal ( message: string, error?: Error | any, ...args: never[] ) : never {

        this.error( message, error, ...args );
        process.exit( 1 );

    }

}
