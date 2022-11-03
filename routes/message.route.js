const express = require( 'express' );

const router = express.Router();

const { sendMessage, pullMessage, acknowledgeMessage } = require( '../controllers/message.controller' );

router.post( '/send', sendMessage );

router.get( '/pull/:topic', pullMessage );

router.delete( '/acknowledge/:topic', acknowledgeMessage );

module.exports = router;
