import { Server } from '@pseinfo/app/core/Server';

( async () => {

    const server = new Server();

    await server.init();
    await server.start();

} )();
