const FriendService = require('../services/FriendService');

class FriendController {
    static async addFriend(req, res) {
        await FriendService.addFriend(req.params.userId, req.params.friendId);
        res.status(201).json({ message: 'Friend added' });
    }

    static async listFriends(req, res) {
        const friends = await FriendService.listFriends(req.params.userId);
        res.json(friends);
    }
}

module.exports = FriendController;
