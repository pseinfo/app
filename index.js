const { app } = require( './dist/app' );

( async () => {

    await app.initialize();
    await app.start();

} )();
