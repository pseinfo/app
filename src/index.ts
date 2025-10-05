import { Server } from './core/Server';

( async () : Promise< void > => {

    try {

        const server = new Server();
        await server.start();

    } catch ( err ) {

        console.error( 'Failed to start server:', err );
        process.exit( 1 );

    }

} )();
