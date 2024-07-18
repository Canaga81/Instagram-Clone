const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');

//^ Add Message
router.post('/', async (req, res) => {

    const newMessage = await new Message(req.body);

    try {
        
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Get a Message
router.get('/:conversationId', async (req, res) => {

    try {
        
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json(error)
    }

} )

module.exports = router;