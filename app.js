const express = require( 'express' );
const indexRouter = require( './routes/message.route' );

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( indexRouter );

// eslint-disable-next-line no-unused-vars
app.use( ( req, res, next ) => {
	res.status( 404 ).json( { error: 'Not Found' } );
} );

module.exports = app;
