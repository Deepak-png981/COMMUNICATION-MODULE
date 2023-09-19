import MessageApi from "../apis/messageAPis.js";

class ChatService {
    constructor(apiBaseUrl) {
        this.messageApi = new MessageApi(apiBaseUrl);
    }

    async sendMessage(from, to, content) {
        return this.messageApi.sendMessage(from, to, content);
    }
}

export default ChatService