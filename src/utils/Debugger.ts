export class Debugger {

    constructor ( private debug: boolean = false ) {}

    public get enabled () : boolean { return this.debug }

    private logMsg ( type: 'log' | 'warn' | 'error', module: string, msg: string, critical?: boolean ) : void {

        if ( critical || type === 'error' || this.debug ) console[ type ](
            `${ new Date().toISOString() } [${ type.toUpperCase() }] ${ module }: ${ msg }`
        );

    }

    public log ( module: string, msg: string, critical?: boolean ) : void { this.logMsg( 'log', module, msg, critical ) }

    public warn ( module: string, msg: string, critical?: boolean ) : void { this.logMsg( 'warn', module, msg, critical ) }

    public err ( module: string, msg: string, err?: any ) : void {

        this.logMsg( 'error', module, msg + ( err instanceof Error ) ? `: ${ err.message }` : ``, true );

    }

    public exit ( module: string, msg: string, err?: any ) : void {

        this.err( module, msg, err );
        process.exit( 1 );

    }

}
