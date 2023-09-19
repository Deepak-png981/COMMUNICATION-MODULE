const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    type: String, // 'audio' or 'video'
    timestamp: Date,
});

module.exports = mongoose.model('Call', CallSchema);
