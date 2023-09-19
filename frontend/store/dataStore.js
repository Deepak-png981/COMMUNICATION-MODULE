class DataStore {
    constructor() {
        this.friends = []; // Array to store friend objects
        this.activeFriend = null; // Currently active friend
        this.user = null;
        // this.messageStatuses = {};
    }
    // getMessageStatusById(messageId) {
    //     return this.messageStatuses[messageId] || {};
    // }
    setUser(user) {
        this.user = user
        console.log("User set:", this.user);
    }
    getUser() {
        return this.user
    }

    // Method to search for friends based on a query
    searchFriends(query) {
        query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
        return this.friends.filter((friend) => {
            // Customize the search criteria based on your needs
            // Here, we're searching by friend name
            return friend.name.toLowerCase().includes(query);
        });
    }

    // Method to set the active friend
    setActiveFriend(friend) {
        this.activeFriend = friend;
        console.log("Active friend set:", this.activeFriend);
    }

    // Method to get the active friend
    getActiveFriend() {
        return this.activeFriend;
    }

    getFriends() {
        return this.friends
    }

    // Method to set the friends list
    setFriends(friends) {
        this.friends = friends.filter((friend) => friend._id !== this.user._id);
    }

    // Method to add a new friend
    addFriend(friend) {
        this.friends.push(friend);
    }

    // Method to remove a friend
    removeFriend(friendId) {
        this.friends = this.friends.filter((friend) => friend.id !== friendId);
    }

    // Method to update a friend's details
    updateFriend(friendId, updatedFriendData) {
        this.friends = this.friends.map((friend) => {
            if (friend.id === friendId) {
                return { ...friend, ...updatedFriendData };
            }
            return friend;
        });
    }

    // Method to send a message to the active friend DEEPAK
    sendMessage(message) {
        if (this.activeFriend) {
            // Check if there's an active friend
            if (!this.activeFriend.messages) {
                this.activeFriend.messages = []; // Initialize an empty array for messages
            }
            message.isSent = true; // Set the isSent status to true
            this.activeFriend.messages.push(message); // Add the message to the active friend's messages
        }
    }

    // Method to add a message to a specific friend
    addMessage(friendId, message) {
        const friend = this.friends.find((friend) => friend._id === friendId);

        if (friend) {
            if (!friend.messages) {
                friend.messages = [];
            }
            friend.messages.push(message);

            // Update lastMessage property for the friend
            friend.lastMessage = message.text;
        }
    }


    // Method to get messages from the active friend
    getMessages() {
        return this.activeFriend ? this.activeFriend.messages || [] : [];
    }

    // Method to update the last message with the active friend
    updateLastMessage(message) {
        if (this.activeFriend) {
            this.activeFriend.lastMessage = message;
        }
    }

    // In the DataStore class I am adding this to get the username from their id Deepak Joshi
    getUserNameById(userId) {
        const user = this.friends.find(friend => friend._id === userId);
        return user ? user.name : null;
    }
    updateFriendLastMessage(friendId, message) {
        const friend = this.friends.find(f => f._id === friendId);
        if (friend) {
            friend.lastMessage = message;
        }
    }

    // Method to update the status of a message Deepak change test 2
    updateMessageStatus(messageId, status) {
        if (this.activeFriend && Array.isArray(this.activeFriend.messages)) {
            const message = this.activeFriend.messages.find(msg => msg._id === messageId);
            if (message) {
                // Update the status (isSent, isDelivered, isSeen) based on the provided status object
                Object.assign(message, status);

                // Store the status in the messageStatuses map
                // this.messageStatuses[messageId] = status;
            }
        } else {
            console.warn("Active friend is not set or messages array is missing");
        }
    }




}

export default DataStore;