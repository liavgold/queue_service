const { createClient } = require( 'redis' );
const { promisify } = require( 'util' );
const { redis } = require( '../config' );

const client = createClient( {
	host: redis.host,
	port: redis.port,
	password: redis.password,
	db: redis.db,
} );

const clientGetAsync = promisify( client.get ).bind( client );
const clientSetAsync = promisify( client.set ).bind( client );
const clientDeleteAsync = promisify( client.del ).bind( client );

const getAsync = async ( key ) => {
	const objectData = await clientGetAsync( key );
	if ( !objectData ) {
		return;
	}
	return JSON.parse( objectData );
};

const setAsync = async ( key, value ) => {
	const result = await clientSetAsync( key, JSON.stringify( value ) );
	return result;
};

const delAsync = async ( key ) => {
	await clientDeleteAsync( key );
};

const close = () => client.quit();

module.exports = {
	getAsync,
	setAsync,
	delAsync,
	close,
};
