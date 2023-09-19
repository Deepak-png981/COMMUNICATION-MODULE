// FriendController.js
import FriendService from '../../services/FriendServices.js';

class FriendController {
    constructor(store) {
        this.store = store;
        this.controllerId = "friend-controller";
        this.component = this.createFriendsPlaceholder(); // Create a placeholder for the component during construction
    }

    addChatController(controller) {
        this.chatController = controller;
    }

    // Initialize the controller (call this when the page loads)
    async init() {
        await this.loadFriends(); // Load friends from the server or mock data
        // Append the friend list to the placeholder
        this.appendFriendsToComponent();
    }

    // Load friends from the service
    async loadFriends() {
        try {
            const friendService = new FriendService();
            const friends = await friendService.getFriends();

            this.store.setFriends(friends)
        } catch (error) {
            console.error("FriendController - Load Friends error:", error);
        }
    }

    // Method to set a friend as active
    setActiveFriend(friend) {
        this.store.setActiveFriend(friend);
        this.chatController.renderChat();
    }

    // Method to render the active friend's information and messages in the UI
    renderActiveFriend() {
        // Implement this method to update the UI with the active friend's details
        if (this.activeFriend) {
            // Create the chat UI for the active friend
            const chatUI = this.chatController.createChatUI();

            // Find the chat container and replace its content with the chat UI
            const chatContainer = document.querySelector(".chat-ui-container");
            if (chatContainer) {
                chatContainer.innerHTML = ""; // Clear existing content
                chatContainer.appendChild(chatUI); // Append the chat UI
            }
        } else {
            // No active friend is set, you can handle this case if needed
        }
    }

    // Method to create a placeholder for the friends component
    createFriendsPlaceholder() {
        // Create a div with the friend-controller ID
        const friendControllerDiv = document.createElement("div");
        friendControllerDiv.id = this.controllerId;

        return friendControllerDiv;
    }

    // Method to append the friends list to the component
    appendFriendsToComponent() {
        if (this.component) {
            // Create a friends list container
            const friendsListContainer = this.createFriendsComponent();
            this.component.appendChild(friendsListContainer);
        }
    }

    // Method to create the friends component
    // createFriendsComponent() {
    //     const friendsListContainer = document.createElement("div");
    //     friendsListContainer.classList.add("friends-list");
    //     const friends = this.store.getFriends()

    //     // Loop through the friends and create a list item for each
    //     friends.forEach((friend) => {
    //         const friendListItem = document.createElement("div");
    //         friendListItem.classList.add("friend-list-item");

    //         // Create a circular status dot based on the friend's status
    //         const statusDot = document.createElement("div");
    //         statusDot.classList.add("status-dot", friend.status === "active" ? "active-status" : "inactive-status");

    //         // Create a profile picture element for the friend
    //         const profilePic = document.createElement("img");
    //         profilePic.src = friend.profilePic;
    //         profilePic.alt = friend.name;
    //         profilePic.classList.add("profile-pic");

    //         const nameElement = document.createElement("span");
    //         nameElement.textContent = friend.name;
    //         nameElement.classList.add("friend-name");
    //         friendListItem.appendChild(nameElement); // First append the name

    //         // Create a last message element for the friend
    //         const lastMessageElement = document.createElement("span");
    //         lastMessageElement.textContent = friend.lastMessage;
    //         lastMessageElement.classList.add("friend-last-message");
    //         friendListItem.appendChild(lastMessageElement); // Then append the last message right below the name

    //         // Add a click event listener to set the friend as active when clicked
    //         friendListItem.addEventListener("click", () => {
    //             console.log(friend);
    //             this.setActiveFriend(friend);
    //         });

    //         // Append the status dot, profile picture, name, and last message to the list item
    //         friendListItem.appendChild(statusDot);
    //         friendListItem.appendChild(profilePic);
    //         friendListItem.appendChild(nameElement);
    //         friendListItem.appendChild(lastMessageElement);

    //         friendListItem.addEventListener("click", () => {
    //             this.setActiveFriend(friend); // Trigger setActiveFriend when a friend is clicked
    //             this.chatController.toggleChatDisplay();
    //         });

    //         // Append the list item to the friends list container
    //         friendsListContainer.appendChild(friendListItem);
    //     });

    //     // Return the friends list container
    //     return friendsListContainer;
    // }
    createFriendsComponent() {
        const friendsListContainer = document.createElement("div");
        friendsListContainer.classList.add("friends-list");
        const friends = this.store.getFriends();

        friends.forEach((friend) => {
            const friendListItem = document.createElement("div");
            friendListItem.classList.add("friend-list-item");
            friendListItem.setAttribute("data-friend-id", friend._id);

            // Create a circular status dot
            const statusDot = document.createElement("div");
            statusDot.classList.add("status-dot", friend.status === "active" ? "active-status" : "inactive-status");
            friendListItem.appendChild(statusDot);

            // Create a profile picture
            const profilePic = document.createElement("img");
            profilePic.src = friend.profilePic;
            profilePic.alt = friend.name;
            profilePic.classList.add("profile-pic");
            friendListItem.appendChild(profilePic);

            // Create a container for name and last message
            const nameAndMessageContainer = document.createElement("div");
            nameAndMessageContainer.classList.add("name-message-container");
            friendListItem.appendChild(nameAndMessageContainer);

            // Add friend's name
            const nameElement = document.createElement("span");
            nameElement.textContent = friend.name;
            nameElement.classList.add("friend-name");
            nameAndMessageContainer.appendChild(nameElement);

            // Add last message
            const lastMessageElement = document.createElement("span");
            lastMessageElement.textContent = friend.lastMessage || "";
            lastMessageElement.classList.add("friend-last-message");
            nameAndMessageContainer.appendChild(lastMessageElement);


            // Event listener for setting active friend
            friendListItem.addEventListener("click", () => {
                this.setActiveFriend(friend);
                this.chatController.loadStoredMessages();
                this.chatController.toggleChatDisplay();
            });

            friendsListContainer.appendChild(friendListItem);
        });

        return friendsListContainer;
    }




    // Method to get the friends container for rendering
    getFriendsContainer() {
        return this.component;
    }
}

export default FriendController;
