const app = require( './app' );
const config = require( './config' );

const port = config.port;

app.listen( port );
console.info( `Server running on port ${port}` );

