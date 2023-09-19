import WebSocketService from "../../services/WsService.js";
import ChatService from "../../services/ChatService.js";
import Notification from "../../services/NotificationService.js"


class ChatController {
    constructor(store) {
        this.controllerId = 'chat-controller';
        this.store = store;
        this.component = this.createChatPlaceholder();
        this.chatService = new ChatService();
        this.webSocketService = new WebSocketService("localhost:3000/"); // Inject the WebSocketService
        this.curentMessage = ''

        //notification - test
        this.notification = new Notification();
        document.body.appendChild(this.notification.notificationElement); // Attach it to the body or any other container

    }

    createChatPlaceholder() {
        const chatControllerDiv = document.createElement("div");
        chatControllerDiv.id = this.controllerId;
        return chatControllerDiv;
    }

    async init() {
        console.log("Init method called");
        const user = this.store.getUser();
        const activeFriend = this.store.getActiveFriend();

        // Only load stored messages if user and activeFriend are set
        if (user && activeFriend) {
            await this.loadStoredMessages();
        }

        this.appendChatToComponent();
        this.initWebSocket();
        // Listen to incoming messages and other events from WebSocket
        this.listenToWebSocketEvents();
        this.listenToMessages();
    }
    listenToWebSocketEvents() {
        // Listen to incoming messages
        // this.webSocketService.listenToMessages((message) => {
        //     this.handleIncomingMessage(message);
        // });

        // Listen to message delivery acknowledgments
        this.webSocketService.socket.on('message-delivered', (data) => {
            // Here, update the UI to reflect that the message has been delivered
            this.updateMessageStatusInChat(data.messageId, { isDelivered: true });
        });

        // Listen to message seen acknowledgments
        this.webSocketService.socket.on('message-seen', (data) => {
            // Here, update the UI to reflect that the message has been seen
            this.updateMessageStatusInChat(data.messageId, { isSeen: true });
        });

        // You can add more event listeners as required
    }
    // New method to fetch stored messages
    async loadStoredMessages() {
        const user = this.store.getUser();
        const activeFriend = this.store.getActiveFriend();

        // Check if user and activeFriend are not null
        if (!user || !activeFriend) {
            console.warn("User or active friend data is not available yet.");
            return;
        }

        const userId = user._id;
        const otherUserId = activeFriend._id;

        try {
            const response = await fetch(`/chat/fetchMessages/${userId}/${otherUserId}`);
            const messages = await response.json();
            if (messages.error) {
                console.error("Server returned an error:", messages.error);
                return;
            }
            // console.log("Received messages from server:", messages);

            // Store these messages in the `this.store`
            // console.log("ssss ", messages);
            messages.forEach(message => {
                this.store.addMessage(message.from, {
                    text: message.content,
                    sender: message.from === userId ? 'user' : 'friend',
                    timestamp: message.timestamp || new Date().toISOString(),
                    isSeen: message.isSeen || false,
                    isDelivered: message.isDelivered || false
                });
            });

            // Optionally, render these messages in the chat UI
            this.renderStoredMessages(messages);
        } catch (error) {
            console.error("Failed to load stored chat messages:", error);
        }
    }

    // Method to render the stored messages (can be integrated with your existing methods)
    renderStoredMessages(messages) {
        const chatMessagesContainer = this.component.querySelector(".chat-messages");
        if (chatMessagesContainer) {
            messages.forEach((message) => {
                const text = message.timeline[message.timeline.length - 1].content; // Extract text
                const timestamp = message.timeline[message.timeline.length - 1].date; // Extract timestamp
                this.appendMessageToChat(chatMessagesContainer, {
                    text: text,
                    sender: message.from === this.store.getUser()._id ? 'user' : 'friend',
                    timestamp: timestamp,
                    isSeen: message.isSeen || false,
                    isDelivered: message.isDelivered || false
                });
            });
        }
    }

    appendChatToComponent() {
        if (this.component) {
            const chatUI = this.createChatUI();
            this.component.appendChild(chatUI);
        }
    }

    getLastUserMessage() {
        const messages = this.store.getMessages();
        const lastUserMessage = messages.reverse().find(message => message.sender === 'user');
        return lastUserMessage ? lastUserMessage.text : "";
    }

    createChatUI() {
        const chatUIContainer = document.createElement("div");
        chatUIContainer.classList.add("chat-ui-container");

        if (!this.store.getActiveFriend()) {
            chatUIContainer.appendChild(this.createEmptyChatContainer());
        } else {
            this.activeFriend = this.store.getActiveFriend();
            chatUIContainer.appendChild(this.createChatHeader());
            chatUIContainer.appendChild(this.createChatMessagesContainer());
            chatUIContainer.appendChild(this.createChatInputContainer());
        }
        return chatUIContainer;
    }


    // Create the empty chat container
    createEmptyChatContainer() {
        const emptyChatContainer = document.createElement("div");
        emptyChatContainer.classList.add("empty-chat-container");

        const chatComponentPlaceholder = document.createElement("div");
        chatComponentPlaceholder.classList.add("empty-chat-component");

        emptyChatContainer.appendChild(chatComponentPlaceholder);

        return emptyChatContainer;
    }


    // Create the chat header
    createChatHeader() {
        const chatHeader = document.createElement("div");
        chatHeader.classList.add("chat-header");

        // Create a container for friend's details (name and last message)
        const friendDetailsContainer = document.createElement("div");
        friendDetailsContainer.classList.add("friend-details-container");

        // Append friend name and last message to the container
        friendDetailsContainer.appendChild(this.createFriendName());
        // friendDetailsContainer.appendChild(this.createLastUserMessageElement()); // Displaying the last message below the friend's name

        chatHeader.appendChild(this.createProfilePic());
        chatHeader.appendChild(friendDetailsContainer); // Append the container to the chat header
        chatHeader.appendChild(this.createStatusDot());

        return chatHeader;
    }


    // Create the profile picture element
    createProfilePic() {
        const profilePic = document.createElement("img");
        profilePic.src = this.activeFriend.profilePic;
        profilePic.alt = this.activeFriend.name;
        profilePic.classList.add("profile-pic");
        return profilePic;
    }

    // Create the friend name element
    createFriendName() {
        const friendName = document.createElement("span");
        friendName.textContent = this.activeFriend.name;
        friendName.classList.add("friend-name");
        return friendName;
    }

    // Create the status dot element
    createStatusDot() {
        const statusDot = document.createElement("div");
        statusDot.classList.add("status-dot", this.activeFriend.status === "active" ? "active-status" : "inactive-status");
        return statusDot;
    }

    // Create the chat messages container
    createChatMessagesContainer() {
        const chatMessagesContainer = document.createElement("ul");
        chatMessagesContainer.classList.add("chat-messages");

        // Append existing messages to the chat messages container
        const messages = this.store.getMessages();
        messages.forEach((message) => {
            this.appendMessageToChat(chatMessagesContainer, message);
        });

        return chatMessagesContainer;
    }


    // Create the chat input container
    createChatInputContainer() {
        const chatInputContainer = document.createElement("div");
        chatInputContainer.classList.add("chat-input");

        chatInputContainer.appendChild(this.createMessageInput());
        chatInputContainer.appendChild(this.createSendButton());

        return chatInputContainer;
    }
    createMessageInput() {
        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type a message...";
        messageInput.classList.add("message-input");
        this.currentMessage = '';
        // Set the input value to the currentMessage
        messageInput.value = this.currentMessage;

        messageInput.addEventListener("change", (e) => {
            // Update the currentMessage when the input changes
            this.currentMessage = e.target.value;
            // console.log(this.currentMessage);
        });

        // Add keyup event to check for Enter key press
        messageInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                // Check if this.currentMessage is defined before trimming
                const message = (this.currentMessage || '').trim();
                if (message) {
                    this.sendMessage(message);
                    // Clear the input field after sending
                    this.currentMessage = '';
                    messageInput.value = '';
                }
            }
        });

        return messageInput;
    }


    // Create the send button
    createSendButton() {
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.classList.add("send-button");

        sendButton.addEventListener("click", () => {
            // Get the message from currentMessage
            const message = this.currentMessage.trim();

            if (message) {
                this.sendMessage(message);
                // Clear the input field after sending
                this.currentMessage = '';
                const messageInput = this.component.querySelector(".message-input");
                messageInput.value = '';
            }
        });

        return sendButton;
    }



    renderChat() {
        this.component.innerHTML = '';
        let chatComponent = this.createChatUI();
        this.component.appendChild(chatComponent);

        this.toggleChatDisplay();
    }

    getChatContainer() {
        return this.component;
    }

    // showChatUI() {
    //     const chatUI = document.querySelector('.chat-ui-container');

    //     if (chatUI) {
    //         chatUI.style.display = 'flex';
    //         this.hideFriendList();
    //     }
    // }
    showChatUI() {
        const chatUI = document.querySelector('.chat-ui-container');

        if (chatUI) {
            chatUI.style.display = 'flex';
            this.hideFriendList();
            this.scrollToBottom();

            // Emit chat-opened event when chat UI is shown
            const activeFriend = this.store.getActiveFriend();
            if (activeFriend) {
                this.webSocketService.socket.emit('chat-opened', activeFriend._id);
            }
        }
    }
    hideFriendList() {
        const friendList = document.querySelector('.friends-list');
        if (friendList) {
            friendList.style.display = 'none';
            this.component.classList.add('chat-open');

        }
    }

    hideChatUI() {
        const chatUI = this.component.querySelector('.chat-ui-container');
        if (chatUI) {
            chatUI.style.display = 'none';
            this.showFriendList();
        }
    }

    showFriendList() {
        const friendList = document.querySelector('.friends-list');
        if (friendList) {
            friendList.style.display = 'block';
            this.component.classList.remove('chat-open');
        }
    }

    toggleCloseButton() {
        const chatToggleButton = document.createElement('button');
        chatToggleButton.classList.add('chat-toggle-button');
        chatToggleButton.textContent = 'X';

        chatToggleButton.addEventListener('click', () => {
            this.hideChatUI();
        });

        const chatHeader = this.component.querySelector('.chat-header');
        chatHeader.appendChild(chatToggleButton);
    }

    scrollToBottom() {
        window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight);
    }

    toggleChatDisplay() {
        const chatUI = this.component.querySelector('.chat-ui-container');
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768 && chatUI && (chatUI.style.display === 'none' || chatUI.style.display === '')) {
            this.showChatUI();
            this.toggleCloseButton();
            this.scrollToBottom();
        }
    }

    initWebSocket() {
        this.webSocketService.connect();
    }

    // Listen to incoming messages from the WebSocket
    listenToMessages() {
        // this.webSocketService.socket.on('chat-opened', (data) => {
        //     console.log(data);
        // });


        this.webSocketService.listenToMessages((message) => {
            // Handle incoming message
            console.log("hsjdjsdf", message);
            this.handleIncomingMessage(message);
            // this.updateMessageStatusInChat()
        });
        this.webSocketService.socket.on('message-seen', (data) => {
            const { userId } = data;
            // console.log("data ", data);
            // Update the UI to show that messages sent to userId have been seen
            this.updateMessageStatusInChat('seen');
        });
        this.webSocketService.listenToMessageStatusUpdates((update) => {
            // Update message status in the DataStore
            this.store.updateMessageStatus(update.messageId, update.status);
            // Reflect that change in the chat UI
            this.updateMessageStatusInChat(update.messageId, update.status);
        });
    }

    // Handle incoming messages
    handleIncomingMessage(message) {
        // Add the incoming message to the store
        this.store.addMessage(message.from, {
            text: message.content,
            sender: message.from,
            timestamp: message.timestamp || new Date().toISOString(),
        });

        this.webSocketService.socket.emit('message-delivered', { messageId: message._id });
        const activeFriend = this.store.getActiveFriend();
        message.isDelivered = true;
        if (activeFriend && activeFriend._id === message.from) {
            // If the sender is the currently active friend, add the message to the active friend's messages
            message.isSeen = true;
            const chatMessagesContainer = this.component.querySelector(".chat-messages");
            console.log("dsjds ", message);
            this.appendMessageToChat(chatMessagesContainer, {
                text: message.content,
                sender: message.from,
                timestamp: message.timestamp || new Date().toISOString(),
                isDelivered: message.isDelivered,
                isSeen: message.isSeen
            });
            const user = this.store.getUser();
            // this.store.updateFriendLastMessage(user._id, message);
            this.updateMessageStatusInChat(activeFriend._id, message);
            // api call at mark as seen
            // const options = {
            //     method: 'POST',             // HTTP method
            //     headers: {
            //         'Content-Type': 'application/json' // Specify content type as JSON
            //     },
            // };
            // fetch("/chat/markAsSeen/" + user._id + "/" + activeFriend._id, options)
            // console.log("hiii");
            // Emitting WebSocket event instead of API call
            this.webSocketService.socket.emit('mark-messages-as-seen', {
                userId: user._id,
                otherUserId: activeFriend._id
            });

        } else {
            // If the sender is not the currently active friend, show a notification
            let senderName = this.store.getUserNameById(message.from);
            if (!senderName) {
                senderName = message.from;
            }

            // Show the notification
            this.notification.showNotification(`New message from ${senderName}: ${message.content}`);

            // Optionally, after a few seconds, you can hide the notification
            setTimeout(() => {
                this.notification.hideNotification();
            }, 5000); // Hide after 5 seconds
        }

        // Update the last message in the DataStore and reflect the change in the friend list UI
        this.store.updateFriendLastMessage(message.from, message.content);
        // Update the last message displayed in the friends list for the given friend ID
        this.updateFriendListLastMessageDisplay(message.from, message.content);

    }

    updateFriendListLastMessageDisplay(friendId, messageContent) {
        const friendListItem = document.querySelector(`.friend-list-item[data-friend-id="${friendId}"] .friend-last-message`);
        if (friendListItem) {
            friendListItem.textContent = messageContent;
        }
    }






    // Send a message using the WebSocket
    sendMessage(message) {
        console.log("hacker ", message);
        if (this.store.getActiveFriend()) {
            // Get the active friend's ID
            const activeFriend = this.store.getActiveFriend();
            if (!activeFriend) {
                console.error("Active friend is not set yet.");
                return;
            }
            const activeFriendId = this.store.getActiveFriend()._id;
            const userId = this.store.getUser()._id
            // Update the store with the sent message
            this.store.addMessage(activeFriendId, {
                text: message,
                sender: 'user', // You can set the sender as needed
                timestamp: new Date().toISOString(), // You can set the timestamp as needed
            });

            // Append the sent message to the chat messages container
            const chatMessagesContainer = this.component.querySelector(".chat-messages");
            if (chatMessagesContainer) {
                this.appendMessageToChat(chatMessagesContainer, {
                    text: message,
                    sender: 'user',
                    timestamp: new Date().toISOString(),
                });
            }
            this.store.updateFriendLastMessage(activeFriendId, message);
            this.updateFriendListLastMessageDisplay(activeFriendId, message);
            // Clear the currentMessage
            this.currentMessage = '';

            // Clear the input field
            const messageInput = this.component.querySelector(".message-input");
            messageInput.value = '';

            // You can also send the message to the server or perform other actions here
            this.chatService.sendMessage(
                userId,
                activeFriendId,
                message
            )

        }
    }


    appendMessageToChat(chatMessagesContainer, message) {
        console.log("Message data:", message);
        const messageElement = document.createElement("div");
        messageElement.textContent = message.text;

        messageElement.classList.add("chat-message");

        // Add a unique data-message-id attribute to the message element for future reference
        messageElement.setAttribute('data-message-id', message._id);

        if (message.sender === 'user') {
            messageElement.classList.add("user-message");
        } else {
            messageElement.classList.add("friend-message");
        }

        const timestampSpan = document.createElement("span");
        timestampSpan.textContent = this.formatTimestamp(message.timestamp);
        timestampSpan.classList.add("chat-message-timestamp");

        const statusSpan = document.createElement("span");

        if (message.isSeen) {
            statusSpan.textContent = "\u2713\u2713\u2713"; // Triple tick symbol
        } else if (message.isDelivered) {
            statusSpan.textContent = "\u2713\u2713"; // Double tick symbol
        } else {
            statusSpan.textContent = "\u2713"; // Single tick symbol
        }
        statusSpan.classList.add("chat-message-status");

        messageElement.appendChild(timestampSpan);
        messageElement.appendChild(statusSpan);

        chatMessagesContainer.appendChild(messageElement);

        // As the chat is opened, mark messages as seen
        // this.webSocketService.socket.on('chat-opened', (otherUserId) => {
        //     this.webSocketService.socket.emit('mark-messages-as-seen', { userId: this.store.getUser()._id, otherUserId });
        // });

        this.scrollToBottom();

    }


    updateMessageStatusInChat(messageId, status) {
        console.log("Update status:", messageId, status);
        const chatMessagesContainer = this.component.querySelector(".chat-messages");
        if (chatMessagesContainer) {
            const messageElement = chatMessagesContainer.querySelector(`[data-message-id="${messageId}"]`);
            if (messageElement) {
                const statusSpan = messageElement.querySelector(".chat-message-status");
                if (statusSpan) {
                    // Update the tick symbol based on the received status
                    if (status.isSeen == true) {
                        statusSpan.textContent = "\u2713\u2713\u2713"; // Triple tick symbol
                    } else if (status.isDelivered) {
                        statusSpan.textContent = "\u2713\u2713"; // Double tick symbol
                    } else {
                        statusSpan.textContent = "\u2713"; // Single tick symbol
                    }
                }
            }
        }
    }




    // Don't forget to disconnect the WebSocket when the chat is closed or the page is unloaded
    disconnectWebSocket() {
        this.webSocketService.disconnect();
    }

    formatTimestamp(timestamp) {
        // console.log("Raw timestamp:", timestamp);

        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }


}

export default ChatController;
