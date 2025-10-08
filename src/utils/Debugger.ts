export class Debugger {

    constructor ( private debug: boolean = false ) {}

    public get enabled () : boolean { return this.debug }

    private logMsg ( type: 'log' | 'warn' | 'error', msg: string, critical?: boolean ) : void {

        if ( critical || type === 'error' || this.debug ) console[ type ](
            `${ new Date().toISOString() } [${ type.toUpperCase() }] ${ msg }`
        );

    }

    public log ( msg: string, critical?: boolean ) : void { this.logMsg( 'log', msg, critical ) }

    public warn ( msg: string, critical?: boolean ) : void { this.logMsg( 'warn', msg, critical ) }

    public err ( msg: string, err?: any ) : void { this.logMsg( 'error', msg + ( err instanceof Error ) ? `: ${ err.message }` : ``, true ) }

    public exit ( msg: string, err?: any ) : void { this.err( msg, err ), process.exit( 1 ) }

}
