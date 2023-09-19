// LogoutController.js
import AuthService from '../../services/AuthService.js';

class LogoutController {
    constructor() {
        this.buttonContainer = null;
        this.logoutButton = null;
    }

    async handleLogout() {
        // Use the AuthService to perform the logout
        const isLoggedOut = await AuthService.logout();

        if (isLoggedOut) {
            // Redirect the user to the login page after successful logout
            window.location.href = "/login";
        } else {
            // Handle logout failure (optional)
            console.error("Logout failed.");
        }

        // You can also remove any user-specific data from local storage or perform other logout-related tasks here.
    }

    render() {
        if (!this.buttonContainer) {
            this.buttonContainer = document.createElement("div");
            this.logoutButton = document.createElement("button");
            this.logoutButton.textContent = "Logout";

            // Add a click event listener to the logout button
            this.logoutButton.addEventListener("click", () => {
                this.handleLogout();
            });

            this.buttonContainer.appendChild(this.logoutButton);
        }

        return this.buttonContainer;
    }

    getLogoutButton() {
        if (!this.buttonContainer) {
            this.render(); // Ensure the button is rendered
        }
        return this.buttonContainer;
    }
}

export default LogoutController;
