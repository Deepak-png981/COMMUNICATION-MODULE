import LoginController from '../../controllers/authController/LogInController.js';
import SignUpController from '../../controllers/authController/SignUpController.js';
import LogoutController from '../../controllers/authController/LogOutController.js';
import UserProfileController from '../../controllers/userController/userProfileController.js'; // Importing UserProfileController
import { createNavbar } from '../../partials/navbar.js';

// Create instances of the controllers
const loginController = new LoginController();
const signUpController = new SignUpController();
const logoutController = new LogoutController();
const userProfileController = new UserProfileController(); // Creating an instance of UserProfileController

// Function to render content with navbar for User
function renderUserPage(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild(createNavbar()); // Add the navbar
    appElement.appendChild(content);
}

// Define your user routes and controllers using page.js
page('/login', () => {
    renderUserPage(loginController.getFormContainer());
});

page('/signup', () => {
    renderUserPage(signUpController.renderSignUpForm());
});

page('/logout', () => {
    // Handle logout here using the LogoutController
    logoutController.handleLogout();
});

// Using the UserProfileController instance named userProfileController
page('/profile',async () => {
    renderUserPage( await userProfileController.getProfileContainer() );
});

export { renderUserPage };
