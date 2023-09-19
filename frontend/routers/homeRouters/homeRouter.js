import HomeController from '../../controllers/HomeController.js';
import { createNavbar } from '../../partials/navbar.js';

// Create an instance of the HomeController
const homeController = new HomeController();

// Function to render content with navbar for Home
function renderHomePage(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild(createNavbar()); // Add the navbar
    appElement.appendChild(content);
}

// Define your home route using page.js
page('/', () => {
    renderHomePage(homeController.getHomeContainer());
});

export { renderHomePage };
