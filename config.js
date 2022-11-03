require( 'dotenv' ).config();

module.exports = {
	port: process.env.PORT || 3000,
	redis: {
		host: process.env.REDIS_HOST || '0.0.0.0',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PASSWORD,
		db: process.env.REDIS_DATABASE_INDEX || 0,
	},
	queue: {
		queue_size: process.env.QUEUE_SUM || 100,
		message_size: process.env.MESSAGE_SIZE || 1000,
	},

};
