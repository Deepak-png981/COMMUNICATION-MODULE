const ChatMessage = require('../models/MessageModel');

class ChatService {
    constructor() { }

    // Send chat message
    async sendChatMessage(from, to, content) {
        const message = new ChatMessage({
            from,
            to,
            timeline: [{ content, date: new Date() }], // Create initial timeline entry
            isSent: true
        });

        await message.save();
        return message;
    }

    // Edit chat message
    async editChatMessage(messageId, editedContent) {
        const message = await ChatMessage.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }

        // Add the edited entry to the timeline
        message.timeline.push({ content: editedContent, date: new Date() });

        // Update the timestamp to the current date
        message.timestamp = new Date();

        await message.save();
        return message;
    }
    // mark as deliver function DEEPAK 
    static async markAsDelivered(userId) {
        await ChatMessage.updateMany({ to: userId, isDelivered: false }, { isDelivered: true });
        return ChatMessage.find({ to: userId, isDelivered: true, isSeen: false });
    }

    static async markAsSeen(userId, otherUserId) {
        // console.log("hi");
        await ChatMessage.updateMany({ from: otherUserId, to: userId, isSeen: false }, { isSeen: true });
        return ChatMessage.find({ from: otherUserId, to: userId, isSeen: true });
    }



    // This method fetches messages between two users
    async fetchChatMessagesBetweenUsers(userId, otherUserId) {
        // Logic to get messages between userId and otherUserId from the database
        // This assumes you have a ChatMessage model or similar
        return await ChatMessage.find({
            $or: [
                { from: userId, to: otherUserId },
                { from: otherUserId, to: userId }
            ]
        }).sort({ timestamp: 1 }); // Sorting by timestamp to get messages in order
    }


}

module.exports = ChatService;
