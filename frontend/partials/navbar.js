import { NavLink } from "../utils/navlink.js";

export function createNavbar() {
    const navElement = document.createElement('nav');
    navElement.classList.add('navbar'); // Add a class for styling

    // Create NavLink instances
    const homeLink = new NavLink('Home', '/');
    const loginLink = new NavLink('Login', '/login');
    const signupLink = new NavLink('Signup', '/signup');
    const profileLink = new NavLink('Profile', '/profile'); // Replace ':userId' with actual user ID
    const friendsLink = new NavLink('Friends', '/friends');

    // Create a <ul> element
    const ulElement = document.createElement('ul');
    ulElement.classList.add('navbar-list'); // Add a class for styling
    ulElement.classList.add('collapsed'); // Add a class for styling

    // Append NavLink elements to the <ul>
    ulElement.appendChild(homeLink.getElement());
    ulElement.appendChild(loginLink.getElement());
    ulElement.appendChild(signupLink.getElement());
    ulElement.appendChild(profileLink.getElement());
    ulElement.appendChild(friendsLink.getElement());

    // Create a theme toggle button
    const themeToggleButton = document.createElement('button');
    themeToggleButton.classList.add('theme-toggle-button');
    themeToggleButton.textContent = 'Toggle Theme';

    // Create an <li> element for the theme toggle
    const themeToggleLi = document.createElement('li');
    themeToggleLi.classList.add('theme-toggle'); // Add a class for styling
    themeToggleLi.appendChild(themeToggleButton);

    // Append the theme toggle <li> to the <ul>
    ulElement.appendChild(themeToggleLi);

    // Function to toggle the theme
    function toggleTheme() {
        const body = document.body;
        const themes = ['light-theme', 'dark-theme', 'skyblue-theme', 'blood-red-theme', 'neon-theme', 'darkest-dark-theme', 'lightest-light-theme', 'windows-xp-theme', ".whatsapp-dark-theme", ".whatsapp-light-theme"];

        // Get the current theme class
        const currentTheme = themes.find(theme => body.classList.contains(theme));

        // Remove the current theme class
        body.classList.remove(currentTheme);

        // Choose a random theme (excluding the current one)
        let randomTheme;
        do {
            randomTheme = themes[Math.floor(Math.random() * themes.length)];
        } while (randomTheme === currentTheme);

        // Apply the random theme to the body
        body.classList.add(randomTheme);
    }


    // Attach the toggleTheme function to the theme button's click event
    themeToggleButton.addEventListener('click', toggleTheme);

    // Append the <ul> to the <nav>
    navElement.appendChild(ulElement);

    const hamburgerButton = document.createElement('button');
    hamburgerButton.classList.add('hamburger-button');
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('span');
        bar.classList.add('bar');
        hamburgerButton.appendChild(bar);
    }

    // Append the hamburger button to the <nav>
    navElement.appendChild(hamburgerButton);

    function toggleNavbar() {
        const ulElement = navElement.querySelector('ul.navbar-list');
        ulElement.classList.toggle('collapsed');
        hamburgerButton.classList.toggle('open');
    }

    // Attach the toggleNavbar function to the hamburger button's click event
    hamburgerButton.addEventListener('click', toggleNavbar);

    return navElement;
}
