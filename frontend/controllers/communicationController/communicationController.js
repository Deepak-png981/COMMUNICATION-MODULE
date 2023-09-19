import DataStore from "../../store/dataStore.js"
import ChatController from "../chatController/chatController.js"
import FriendController from "../friendController/FriendControllers.js"

class CommunicationController {
    constructor() {
        this.dataStore = new DataStore()
        this.controllerId = 'communication-controller'
        this.friendController = new FriendController(this.dataStore)
        this.chatController = new ChatController(this.dataStore);

    }

    async init(user) {

        this.dataStore.setUser(user); // Set the user first

        await this.friendController.init(); // Await the friend controller initialization
        this.chatController.init();

        this.friendController.addChatController(this.chatController);
    }

    getCommunicationContainer() {
        const communicationControllerDiv = document.createElement("div");
        communicationControllerDiv.id = this.controllerId;
        const friendContainer = this.friendController.getFriendsContainer()
        const chatContainer = this.chatController.getChatContainer()

        communicationControllerDiv.appendChild(friendContainer)
        communicationControllerDiv.appendChild(chatContainer)

        console.log(communicationControllerDiv);

        return communicationControllerDiv
    }


}

export default CommunicationController