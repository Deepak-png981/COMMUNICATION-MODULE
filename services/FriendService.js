const FriendModel = require('../models/FriendModel');

class FriendService {
    static async addFriend(userId, friendId) {
        let userFriends = await FriendModel.findOne({ userId });
        if (!userFriends) {
            userFriends = new FriendModel({ userId, friends: [] });
        }
        userFriends.friends.push(friendId);
        await userFriends.save();
    }

    static async listFriends(userId) {
        const userFriends = await FriendModel.findOne({ userId });
        return userFriends ? userFriends.friends : [];
    }
}

module.exports = FriendService;
