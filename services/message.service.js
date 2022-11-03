const { v1: uuidv1 } = require( 'uuid' );
const config = require( '../config' );
const {
	getAsync, setAsync,
} = require( './redis.service' );

const addMessage = async ( { topic, message } ) => {
	const topicQueue = await getAsync( topic );

	// if topic not exist create new topic queue
	if ( !topicQueue ) {
		setAsync( `${topic}`, [ { ...message, id: uuidv1() } ] ).then();
	}

	// if queue is full
	if ( topicQueue.length >= config.queue.queue_size ) {
		return Error( 'Queue full' );
	}

	// message size is bigger than max configuration message size
	if ( message.length >= config.queue.message_size ) {
		return Error( 'The message is larger than the maximum request size you have configured with the max' );
	}

	// add message to exist topic queue
	topicQueue.unshift( { ...message, id: uuidv1() } );
	setAsync( `${topic}`, topicQueue ).then();
	return { status: 'ok' };
};

const getMessage = async ( { topic } ) => {
	const topicQueue = await getAsync( topic );

	if ( !topicQueue ) {
		return Error( 'topic queue not exist' );
	}
	const message = topicQueue[0];// remove message from queue
	topicQueue[0] = { ...message, state: 'reserved' };
	addMessage( topic, topicQueue ); // update queue in db
	return { message };
};

const delMessage = async ( topic ) => {
	const topicQueue = await getAsync( topic );
	if ( !topicQueue ) {
		return Error( 'topic queue not exist' );
	}
	const filterQueue = topicQueue.filter( ( message ) => message.state ); // get reserved messages
	const index = topicQueue.indexOf( filterQueue[0].id );
	topicQueue.splice( index, 1 );
	addMessage( topic, topicQueue ); // update queue in db

	return { status: 'ok' };
};

module.exports = {
	addMessage,
	getMessage,
	delMessage,
};
