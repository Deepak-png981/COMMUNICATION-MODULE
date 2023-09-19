class HomeController {
  constructor() {
    // Initialize any properties or state needed for the home page
    this.homeContainer = this.renderHome();
  }

  renderHome() {
    // Create a container element for the home page content
    const container = document.createElement("div");
    container.classList.add("home-container"); // You can add CSS classes for styling

    // Create and add content to the home page
    const heading = document.createElement("h1");
    heading.textContent = "Welcome to the Home Page";

    const paragraph = document.createElement("p");
    paragraph.textContent = "This is the home page content.";

    // Append the elements to the container
    container.appendChild(heading);
    container.appendChild(paragraph);

    return container; // Return the container as a Node
  }

  getHomeContainer() {
    return this.homeContainer;
  }
}

export default HomeController;
