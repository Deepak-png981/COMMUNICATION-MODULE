//testing for the notification component
class Notification {
    constructor() {
        this.notificationElement = this.createNotificationElement();
    }

    createNotificationElement() {
        const notification = document.createElement("div");
        notification.classList.add("chat-notification");
        notification.style.display = "none"; // hide by default
        return notification;
    }

    showNotification(message) {
        this.notificationElement.textContent = message;
        this.notificationElement.style.display = "block";
    }

    hideNotification() {
        this.notificationElement.style.display = "none";
    }
}
export default Notification;