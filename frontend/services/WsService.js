import { CookieService } from "./CookieServices.js";

class WebSocketService {
    constructor(serverURL) {
        this.socket = null;
        this.serverURL = serverURL; // The URL of your WebSocket server
        this.cookieService = new CookieService();
        this.messageStatusCallback = null; // Callback for message status updates
    }

    connect() {
        const token = this.cookieService.getCookie('token');
        this.socket = io(this.serverURL, {
            auth: {
                token
            }
        });

        // Listen to the 'message-status-updated' event
        this.socket.on('message-status-updated', (update) => {
            // Handle the update
            this.handleMessageStatusUpdate(update);
        });

        // Listen to the 'connect' event
        this.socket.on("connect", () => {
            console.log("WebSocket connected.");
        });
    }

    handleMessageStatusUpdate(update) {
        // You can decide what to do here. Maybe call a callback or emit another event.
        if (this.messageStatusCallback) {
            this.messageStatusCallback(update);
        }
    }

    disconnect() {
        // Close the WebSocket connection
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendMessage(receiver, message) {
        if (this.socket) {
            // Send a message to the server
            this.socket.emit("message", { receiver, message });
        }
    }

    listenToMessages(callback) {
        if (this.socket) {
            // Listen for incoming messages and invoke the callback with the message data
            this.socket.on("message", (data) => {
                // console.log("humara ", data);
                callback(data);
            });
        }
    }

    listenToMessageStatusUpdates(callback) {
        this.socket.on('message-status-updated', callback);
    }
}

export default WebSocketService;
