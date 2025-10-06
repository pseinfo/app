import { Server } from '@pseinfo/app/core/Server';

( async () => {

    const server = new Server();
    await server.init();

    server.start();

} )();
