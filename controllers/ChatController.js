const ChatService = require('../services/ChatService');

class ChatController {
    constructor() {
        this.chatService = new ChatService();
        // console.log("ChatService initialized: ", !!this.chatService);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    // Send chat message
    async sendMessage(req, res) {
        try {
            const { from, to, content } = req.body;

            const message = await this.chatService.sendChatMessage(from, to, content);

            // console.log("Saved message:", message);

            // WebSocket trigger event for new message
            // Implement WebSocket logic here
            let ss = req.ss
            ss.sendMessageToUser(to, message.getMessage())
            res.status(201).json({});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send message' });
        }
    }

    // Edit chat message
    async editMessage(req, res) {
        try {
            const { messageId } = req.params;
            const { editedContent } = req.body;
            const updatedMessage = await this.chatService.editChatMessage(messageId, editedContent);

            // WebSocket trigger event for message edit
            // Implement WebSocket logic here

            res.status(200).json({ message: 'Message edited successfully', updatedMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to edit message' });
        }
    }
    async getChatMessages(req, res) {
        try {
            const userId = req.params.userId;
            const otherUserId = req.params.otherUserId;

            const messages = await ChatService.getChatMessagesBetweenUsers(userId, otherUserId);
            res.status(200).json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch messages' });
        }
    }
    // Fetch chat messages between two users
    async fetchMessages(req, res) {
        try {
            const { userId, otherUserId } = req.params;
            const messages = await this.chatService.fetchChatMessagesBetweenUsers(userId, otherUserId);
            // console.log("Fetched messages from DB:", messages);

            res.status(200).json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch messages' });
        }
    }

    async markAsSeen(req, res) {

        try {
            console.log("Inside markAsSeen, chatService is:");
            const { userId, otherUserId } = req.params;

            await this.chatService.markAsSeen(userId, otherUserId);
            // res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'Messages marked as seen successfully' });
        } catch (error) {
            console.error(error);
            // res.status(500).json({ error: 'Failed to mark messages as seen' });
            res.status(500).json({ error: 'Failed to mark messages as seen', details: error.message });

        }
    }


}

module.exports = ChatController;
