const express = require('express');
const FriendController = require('../controllers/FriendController');

const router = express.Router();

router.post('/:userId/add/:friendId', FriendController.addFriend);
router.get('/:userId/list', FriendController.listFriends);

module.exports = router;
