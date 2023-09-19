const jwt = require('jsonwebtoken');
const ChatService = require('./ChatService');
const ChatMessage = require('../models/MessageModel');

class SocketService {
    constructor(io) {
        this.io = io;
        this.connectedSockets = {}; // Store connected sockets with userId
    }

    // Method to handle socket connectionw
    async handleConnection(socket) {
        console.log(`Socket connected: ${socket.id}`);

        // Get userId from socket handshake data (you should set this during authentication)
        const token = socket.handshake.auth.token;
        const decodedToken = jwt.verify(token, "your-secret-key"); // Replace with your JWT secret key
        const userId = decodedToken.userId;

        // Assign userId to the socket
        socket.userId = userId;
        // After socket.userId assignment:
        console.log(`Socket with ID ${socket.id} associated with User ID ${userId}`);

        // Store the socket with userId
        this.connectedSockets[userId] = socket;

        // You can emit an event to the client to confirm the connection
        socket.emit('connected', { message: 'You are connected to the server.' });

        // Mark messages as delivered when a user connects
        // ChatService.markAsDelivered(userId);
        // // Add the following: DEEPAK
        const deliveredMessages = await ChatMessage.find({ to: userId, isDelivered: false });
        deliveredMessages.forEach((msg) => {
            msg.isDelivered = true;
            msg.save();
            const senderSocket = this.connectedSockets[msg.from];
            if (senderSocket) {
                senderSocket.emit('message-status-updated', {
                    messageId: msg._id,
                    status: {
                        isDelivered: true
                    }
                });
            }
        });


        // When a chat is opened, mark messages as seen
        socket.on('chat-opened', async (otherUserId) => {
            const seenMessages = await ChatService.markAsSeen(userId, otherUserId);
            // For each seen message, notify the original sender
            seenMessages.forEach((msg) => {
                const senderSocket = this.connectedSockets[msg.from];
                if (senderSocket) {
                    senderSocket.emit('message-status-updated', {
                        messageId: msg._id,
                        status: {
                            isSeen: true
                        }
                    });
                }
            });
        });


        socket.on('mark-messages-as-seen', async ({ userId, otherUserId }) => {
            const updatedMessages = await ChatService.markAsSeen(userId, otherUserId);
            updatedMessages.forEach(message => {
                socket.emit('message-status-updated', {
                    messageId: message._id,
                    status: {
                        isSeen: message.isSeen,
                        isDelivered: message.isDelivered
                    }
                });
            });
        });


        // Handle disconnect event
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            // Remove the socket from the connectedSockets object
            delete this.connectedSockets[socket.userId];
        });

        // Add more socket event handlers as needed
    }


    // Method to send a message to a specific socket by userId
    sendMessageToUser(userId, data) {
        const socket = this.connectedSockets[userId];
        if (socket) {
            socket.emit('message', data);
        }
    }

    sendSeenAcknowledgementToUser(from, to) {
        const socket = this.connectedSockets[userId];
        if (socket) {
            socket.emit('chat-opened', data);
        }
    }


}

module.exports = SocketService;
