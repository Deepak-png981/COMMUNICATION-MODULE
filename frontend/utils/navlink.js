class NavLink {
    constructor(text, path) {
        this.text = text;
        this.path = path;
        this.element = this.createLinkElement();
        this.init();
    }

    createLinkElement() {
        const link = document.createElement('a');
        link.textContent = this.text;
        link.href = this.path;
        link.setAttribute('data-link', 'true'); // Add a data attribute to identify it as a navigation link
        return link;
    }

    init() {
        // Listen for clicks on the link
        this.element.addEventListener('click', (event) => {
            event.preventDefault();
            this.navigateTo();
        });
    }

    navigateTo() {
        // Change the URL without a full page reload
        history.pushState(null, null, this.path);

        // Trigger a popstate event to handle the route change
        const popstateEvent = new PopStateEvent('popstate', { state: { path: this.path } });
        window.dispatchEvent(popstateEvent);
    }

    getElement() {
        return this.element;
    }

    isActive() {
        // Get the current URL path
        const currentPath = window.location.pathname;

        // Check if the link's path matches the current path
        return currentPath === this.path;
    }
}

export { NavLink };
