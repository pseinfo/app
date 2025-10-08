import { ILogger } from '@pseinfo/app/interfaces/ILogger';
import { inspect } from 'node:util';

export class LoggerService implements ILogger {

    private _enabled: boolean = true;
    private _logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';
    private _context: string = 'PSEServer';

    constructor ( enabled: boolean = true, context: string = 'PSEServer' ) {

        this._enabled = enabled;
        this._context = context;

    }

    private formatMessage ( level: string, message: string, ...args: any[] ) : string {

        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ` ${ args.map( arg => 
            typeof arg === 'object' ? inspect( arg, { depth: 2 } ) : String( arg )
        ).join( ' ' ) }` : '';

        return `[${timestamp}] [${level}] [${this._context}] ${message}${formattedArgs}`;

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

}
