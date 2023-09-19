const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    friends: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('Friend', FriendSchema);
