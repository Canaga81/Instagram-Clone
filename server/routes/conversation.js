const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation.js');

//^ New Conversation
router.post('/', async (req, res) => {

    const newConversation = await new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })

    try {
        
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Get a Conversation a User
router.get("/:userId", async (req, res) => {

    try {
        
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });

        res.status(200).json(conversation);

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Get Conversation Includes two User
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {

    try {
        
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });

        res.status(200).json(conversation);

    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;