import { CookieService } from "../services/CookieServices.js";

class MessageApi {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl; // Base URL of the message API
        this.cookieService = new CookieService()
    }
   

    async sendMessage(from, to, content) {
        try {
            const authToken = this.cookieService.getCookie("token")

            if (!authToken) {
                console.error('Auth token not found in cookies');
                return false;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            };

            const messageData = {
                from,
                to,
                content
            };

            console.log(messageData);

            const response = await fetch("/chat/send", {
                method: 'POST',
                headers,
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error(`Error sending message: ${response.status}`);
            }

            // Message sent successfully
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }
}

export default MessageApi