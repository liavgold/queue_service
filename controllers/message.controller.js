const { addMessage, getMessage, delMessage } = require( '../services/message.service' );

const sendMessage = async ( req, res, next ) => {
	const { topic } = req.body;
	const { message } = req.body;
	next( await addMessage( { topic, message } ).catch( next ) );
};

const pullMessage = async ( req, res, next ) => {
	const { topic } = req.params;
	next( await getMessage( topic ).catch( next ) );
};

const acknowledgeMessage = async ( req, res, next ) => {
	const { topic } = req.params;
	next( await delMessage( topic ).catch( next ) );
};

module.exports = {
	sendMessage,
	pullMessage,
	acknowledgeMessage,
};
