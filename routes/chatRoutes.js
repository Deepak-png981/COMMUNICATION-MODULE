const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

const chatController = new ChatController();

// Send chat message
router.post('/markAsSeen/:userId/:otherUserId', chatController.markAsSeen);
router.post('/send', chatController.sendMessage);
// Edit chat message
router.put('/edit/:messageId', async (req, res) => {
    chatController.editMessage(req, res);
});


router.get('/fetchMessages/:userId/:otherUserId', chatController.fetchMessages);

// router.get('/:userId/:otherUserId', chatController.getChatMessages);


module.exports = router;