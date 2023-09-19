class $d9a67b1cb89c965a$var$HomeController {
    constructor(){
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
var $d9a67b1cb89c965a$export$2e2bcd8739ae039 = $d9a67b1cb89c965a$var$HomeController;


class $ac884c29fd274846$export$b0d92dbee9b5b60d {
    constructor(text, path){
        this.text = text;
        this.path = path;
        this.element = this.createLinkElement();
        this.init();
    }
    createLinkElement() {
        const link = document.createElement("a");
        link.textContent = this.text;
        link.href = this.path;
        link.setAttribute("data-link", "true"); // Add a data attribute to identify it as a navigation link
        return link;
    }
    init() {
        // Listen for clicks on the link
        this.element.addEventListener("click", (event)=>{
            event.preventDefault();
            this.navigateTo();
        });
    }
    navigateTo() {
        // Change the URL without a full page reload
        history.pushState(null, null, this.path);
        // Trigger a popstate event to handle the route change
        const popstateEvent = new PopStateEvent("popstate", {
            state: {
                path: this.path
            }
        });
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


function $1ca3ff8333cff919$export$2136b4bcf93e0b3a() {
    const navElement = document.createElement("nav");
    navElement.classList.add("navbar"); // Add a class for styling
    // Create NavLink instances
    const homeLink = new (0, $ac884c29fd274846$export$b0d92dbee9b5b60d)("Home", "/");
    const loginLink = new (0, $ac884c29fd274846$export$b0d92dbee9b5b60d)("Login", "/login");
    const signupLink = new (0, $ac884c29fd274846$export$b0d92dbee9b5b60d)("Signup", "/signup");
    const profileLink = new (0, $ac884c29fd274846$export$b0d92dbee9b5b60d)("Profile", "/profile"); // Replace ':userId' with actual user ID
    const friendsLink = new (0, $ac884c29fd274846$export$b0d92dbee9b5b60d)("Friends", "/friends");
    // Create a <ul> element
    const ulElement = document.createElement("ul");
    ulElement.classList.add("navbar-list"); // Add a class for styling
    // Append NavLink elements to the <ul>
    ulElement.appendChild(homeLink.getElement());
    ulElement.appendChild(loginLink.getElement());
    ulElement.appendChild(signupLink.getElement());
    ulElement.appendChild(profileLink.getElement());
    ulElement.appendChild(friendsLink.getElement());
    // Create a theme toggle button
    const themeToggleButton = document.createElement("button");
    themeToggleButton.classList.add("theme-toggle-button");
    themeToggleButton.textContent = "Toggle Theme";
    // Create an <li> element for the theme toggle
    const themeToggleLi = document.createElement("li");
    themeToggleLi.classList.add("theme-toggle"); // Add a class for styling
    themeToggleLi.appendChild(themeToggleButton);
    // Append the theme toggle <li> to the <ul>
    ulElement.appendChild(themeToggleLi);
    // Function to toggle the theme
    function toggleTheme() {
        const body = document.body;
        const themes = [
            "light-theme",
            "dark-theme",
            "skyblue-theme",
            "blood-red-theme",
            "neon-theme",
            "darkest-dark-theme",
            "lightest-light-theme",
            "windows-xp-theme",
            ".whatsapp-dark-theme",
            ".whatsapp-light-theme"
        ];
        // Get the current theme class
        const currentTheme = themes.find((theme)=>body.classList.contains(theme));
        // Remove the current theme class
        body.classList.remove(currentTheme);
        // Choose a random theme (excluding the current one)
        let randomTheme;
        do randomTheme = themes[Math.floor(Math.random() * themes.length)];
        while (randomTheme === currentTheme);
        // Apply the random theme to the body
        body.classList.add(randomTheme);
    }
    // Attach the toggleTheme function to the theme button's click event
    themeToggleButton.addEventListener("click", toggleTheme);
    // Append the <ul> to the <nav>
    navElement.appendChild(ulElement);
    return navElement;
}


// Create an instance of the HomeController
const $35f0de680ac1f611$var$homeController = new (0, $d9a67b1cb89c965a$export$2e2bcd8739ae039)();
// Function to render content with navbar for Home
function $35f0de680ac1f611$export$29b010004a948d8(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild((0, $1ca3ff8333cff919$export$2136b4bcf93e0b3a)()); // Add the navbar
    appElement.appendChild(content);
}
// Define your home route using page.js
page("/", ()=>{
    $35f0de680ac1f611$export$29b010004a948d8($35f0de680ac1f611$var$homeController.getHomeContainer());
});


// Import the AuthService class
class $b94f02a273744a5c$export$6377af472808b80a {
    // Function to set a cookie with a given name, value, and expiration time
    setCookie(name, value, expirationDays) {
        const date = new Date();
        date.setTime(date.getTime() + expirationDays * 86400000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
    // Function to get the value of a cookie by name
    getCookie(name) {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(";");
        for(let i = 0; i < cookies.length; i++){
            let cookie = cookies[i];
            while(cookie.charAt(0) === " ")cookie = cookie.substring(1);
            if (cookie.indexOf(cookieName) === 0) return cookie.substring(cookieName.length, cookie.length);
        }
        return "";
    }
    // Function to delete a cookie by name
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}


class $ccec6d9be796cb62$var$AuthAPI {
    constructor(){
        this.cookieService = new (0, $b94f02a273744a5c$export$6377af472808b80a)();
    }
    setAuthToken(token) {
        // Set the token in a cookie with a 7-day expiration (adjust as needed)
        this.cookieService.setCookie("token", token, 7);
    }
    async login(username, password) {
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            console.log(response);
            return response.json();
        } catch (error) {
            console.error("AuthAPI - Login error:", error);
            throw error;
        }
    }
    async signup(username, password, email, name) {
        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    name: name
                })
            });
            return response.json();
        } catch (error) {
            console.error("AuthAPI - Signup error:", error);
            throw error;
        }
    }
    async logout() {
        try {
            const response = await fetch("/auth/logout", {
                method: "POST"
            });
            return response.json();
        } catch (error) {
            console.error("AuthAPI - Logout error:", error);
            throw error; // Propagate the error
        }
    }
    async getCurrentUser() {
        try {
            // Retrieve the token from the cookie
            const token = this.cookieService.getCookie("token");
            if (!token) // Token not found, user is not authenticated
            return {
                error: "token not found"
            };
            // Perform the actual API request to check the current user's status
            const response = await fetch("/auth/getCurrentUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("AuthAPI - Check current user error:", error);
            throw error; // Propagate the error
        }
    }
}
var $ccec6d9be796cb62$export$2e2bcd8739ae039 = $ccec6d9be796cb62$var$AuthAPI;


class $2a6be8f4ab4753f9$var$AuthService {
    constructor(){
        this.authAPI = new (0, $ccec6d9be796cb62$export$2e2bcd8739ae039)();
    }
    async login(credentials) {
        try {
            // Call the login method from the AuthAPI
            const response = await this.authAPI.login(credentials.username, credentials.password);
            // Handle the login response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Login error:", error);
            throw error; // Propagate the error
        }
    }
    async signup(username, password, email, name) {
        try {
            // Call the signup method from the AuthAPI
            const response = await this.authAPI.signup(username, password, email, name);
            // Handle the signup response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Signup error:", error);
            throw error; // Propagate the error
        }
    }
    async logout() {
        try {
            // Call the logout method from the AuthAPI
            const response = await this.authAPI.logout();
            // Handle the logout response as needed
            return response;
        } catch (error) {
            console.error("AuthService - Logout error:", error);
            throw error; // Propagate the error
        }
    }
    async isLoggedin() {
        const currentUser = await this.authAPI.getCurrentUser();
        return currentUser;
    }
}
var $2a6be8f4ab4753f9$export$2e2bcd8739ae039 = $2a6be8f4ab4753f9$var$AuthService;


class $a1660e5edd3e7c3f$var$LoginController {
    constructor(){
        this.username = "";
        this.password = "";
        this.isLoggedIn = false;
        this.formContainer = this.renderLoginForm();
        // Create an instance of AuthService
        this.authService = new (0, $2a6be8f4ab4753f9$export$2e2bcd8739ae039)();
    }
    handleInputChange(event) {
        const { name: name, value: value } = event.target;
        this[name] = value;
    }
    async handleLoginSubmit(event) {
        event.preventDefault();
        // Use the authService instance to handle the login process
        const loginData = {
            username: this.username,
            password: this.password
        };
        try {
            const response = await this.authService.login(loginData);
            // Check if the login was successful based on the response (adjust as needed)
            if (response.token) {
                this.isLoggedIn = true;
                document.cookie = `token=${response.token}; path=/`;
                window.location.href = "/friends"; // Redirect to the home page
                return;
            } else {
                this.isLoggedIn = false;
                // Handle login failure (display error message, etc.)
                console.error("Login failed.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
        // Re-render the form after login attempt
        this.formContainer.innerHTML = "";
        this.formContainer.appendChild(this.renderLoginForm());
    }
    renderLoginForm() {
        const { username: username, password: password, isLoggedIn: isLoggedIn } = this;
        if (isLoggedIn) return document.createDocumentFragment(); // Render nothing if logged in
        const formContainer = document.createElement("div");
        formContainer.classList.add("login-container"); // Adding class for centering
        const formTitle = document.createElement("h2");
        formTitle.textContent = "Login";
        const form = document.createElement("form");
        form.classList.add("login-form"); // Adding class for styling
        form.addEventListener("submit", this.handleLoginSubmit.bind(this));
        const fields = [
            {
                label: "Username:",
                type: "text",
                name: "username",
                value: username
            },
            {
                label: "Password:",
                type: "password",
                name: "password",
                value: password
            }
        ];
        fields.forEach(({ label: label, type: type, name: name, value: value })=>{
            const labelElement = document.createElement("label");
            labelElement.textContent = label;
            const inputElement = document.createElement("input");
            inputElement.type = type;
            inputElement.name = name;
            inputElement.value = value;
            inputElement.required = true; // Making fields required
            if (name === "username") // inputElement.pattern = "^[a-zA-Z0-9]+$";
            inputElement.title = "Username can only contain alphanumeric characters";
            inputElement.addEventListener("input", this.handleInputChange.bind(this));
            form.appendChild(labelElement);
            form.appendChild(inputElement);
        });
        const loginButton = document.createElement("button");
        loginButton.type = "submit";
        loginButton.textContent = "Login";
        form.appendChild(loginButton);
        formContainer.appendChild(formTitle);
        formContainer.appendChild(form);
        return formContainer;
    }
    getFormContainer() {
        return this.formContainer;
    }
}
var $a1660e5edd3e7c3f$export$2e2bcd8739ae039 = $a1660e5edd3e7c3f$var$LoginController;



class $b0a9df180b29b920$var$SignUpController {
    constructor(){
        this.state = {
            email: "",
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            isSignedUp: false,
            validationErrors: {
                email: "",
                name: "",
                username: "",
                password: "",
                confirmPassword: ""
            }
        };
        this.formContainer = this.renderSignUpForm();
        this.authService = new (0, $2a6be8f4ab4753f9$export$2e2bcd8739ae039)();
    }
    handleInputChange(e) {
        const { name: name, value: value } = e.target;
        this.state[name] = value;
        // Clear the error message for the corresponding field
        this.state.validationErrors[name] = "";
        // Update the DOM to remove the error message
        this.updateDOM();
    }
    async handleSignUpSubmit(e) {
        e.preventDefault();
        // Validate the form fields
        const validationErrors = this.validateForm();
        // If there are validation errors, display them and prevent submission
        if (Object.values(validationErrors).some((error)=>error !== "")) {
            this.state.validationErrors = validationErrors; // Update validation errors
            this.updateDOM(); // Update the DOM to display error messages
            return;
        }
        // If validation is successful, proceed with sign-up
        try {
            const response = await this.authService.signup(this.state);
            if (response.success) {
                this.state.isSignedUp = true;
                const message = document.createElement("p");
                message.textContent = `Sign-up successful for ${this.state.username}!`;
                const logoutButton = document.createElement("button");
                logoutButton.textContent = "Logout";
                logoutButton.addEventListener("click", ()=>{
                    message.remove();
                    logoutButton.remove();
                });
                this.formContainer.innerHTML = "";
                this.formContainer.appendChild(message);
                this.formContainer.appendChild(logoutButton);
            } else console.error("Sign-up failed.");
        } catch (error) {
            console.error("An error occurred during sign-up:", error);
        }
    }
    validateForm() {
        const { email: email, name: name, username: username, password: password, confirmPassword: confirmPassword } = this.state;
        const validationErrors = {
            email: "",
            name: "",
            username: "",
            password: "",
            confirmPassword: ""
        };
        // Validation logic for each field
        if (!email || !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) validationErrors.email = "Invalid email address";
        if (!name || name.length < 8) validationErrors.name = "Name must be at least 8 characters";
        if (!username || username.length < 8) validationErrors.username = "Username must be at least 8 characters";
        if (!password || !password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/)) validationErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters";
        if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match";
        return validationErrors;
    }
    renderSignUpForm() {
        const formContainer = document.createElement("div");
        formContainer.id = "signup-container";
        const formTitle = document.createElement("h2");
        formTitle.textContent = "Sign Up";
        const form = document.createElement("form");
        form.id = "signup-form";
        form.addEventListener("submit", this.handleSignUpSubmit.bind(this));
        const fields = [
            {
                label: "Email",
                type: "email",
                name: "email",
                value: this.state.email,
                maxLength: 50
            },
            {
                label: "Name",
                type: "text",
                name: "name",
                value: this.state.name,
                maxLength: 50
            },
            {
                label: "Username",
                type: "text",
                name: "username",
                value: this.state.username,
                maxLength: 30
            },
            {
                label: "Password",
                type: "password",
                name: "password",
                value: this.state.password,
                maxLength: 20
            },
            {
                label: "Confirm Password",
                type: "password",
                name: "confirmPassword",
                value: this.state.confirmPassword,
                maxLength: 20
            }
        ];
        fields.forEach(({ label: label, type: type, name: name, value: value, maxLength: maxLength })=>{
            const labelElement = document.createElement("label");
            labelElement.textContent = label;
            const inputElement = document.createElement("input");
            inputElement.type = type;
            inputElement.name = name;
            inputElement.value = value;
            inputElement.maxLength = maxLength; // Set max length
            inputElement.addEventListener("input", this.handleInputChange.bind(this));
            // Create a container for label and input in a single row
            const formRow = document.createElement("div");
            formRow.className = "form-row";
            formRow.appendChild(labelElement);
            formRow.appendChild(inputElement);
            // Add validation error message element
            const errorElement = document.createElement("span");
            errorElement.className = "error-message";
            errorElement.textContent = this.state.validationErrors[name];
            // Append error message element to the form row
            formRow.appendChild(errorElement);
            form.appendChild(formRow);
        });
        const signUpButton = document.createElement("button");
        signUpButton.id = "signup-button";
        signUpButton.type = "submit";
        signUpButton.textContent = "Sign Up";
        form.appendChild(signUpButton);
        formContainer.append(formTitle, form);
        return formContainer;
    }
    updateDOM() {
        // This method updates the DOM to display validation error messages
        // Loop through the form fields and update error messages
        const form = document.getElementById("signup-form");
        form.querySelectorAll(".form-row").forEach((formRow)=>{
            const fieldName = formRow.querySelector("input").name;
            const errorElement = formRow.querySelector(".error-message");
            errorElement.textContent = this.state.validationErrors[fieldName];
        });
    }
    getFormContainer() {
        return this.formContainer;
    }
}
var $b0a9df180b29b920$export$2e2bcd8739ae039 = $b0a9df180b29b920$var$SignUpController;


// LogoutController.js

class $633a8b471085ae93$var$LogoutController {
    constructor(){
        this.buttonContainer = null;
        this.logoutButton = null;
    }
    async handleLogout() {
        // Use the AuthService to perform the logout
        const isLoggedOut = await (0, $2a6be8f4ab4753f9$export$2e2bcd8739ae039).logout();
        if (isLoggedOut) // Redirect the user to the login page after successful logout
        window.location.href = "/login";
        else // Handle logout failure (optional)
        console.error("Logout failed.");
    // You can also remove any user-specific data from local storage or perform other logout-related tasks here.
    }
    render() {
        if (!this.buttonContainer) {
            this.buttonContainer = document.createElement("div");
            this.logoutButton = document.createElement("button");
            this.logoutButton.textContent = "Logout";
            // Add a click event listener to the logout button
            this.logoutButton.addEventListener("click", ()=>{
                this.handleLogout();
            });
            this.buttonContainer.appendChild(this.logoutButton);
        }
        return this.buttonContainer;
    }
    getLogoutButton() {
        if (!this.buttonContainer) this.render(); // Ensure the button is rendered
        return this.buttonContainer;
    }
}
var $633a8b471085ae93$export$2e2bcd8739ae039 = $633a8b471085ae93$var$LogoutController;


class $770aa835889377ba$var$UserProfileApi {
    async getProfile() {
        return {
            name: "John Doe",
            email: "john@example.com",
            lastActive: "2023-09-05T12:34:56Z",
            bio: "This is John Doe's bio.",
            mobile: "123-456-7890",
            activeHours: "9 AM - 5 PM"
        };
    }
    async updateProfile(newData) {
        // Simulate an API call to update the profile and return updated data
        return Promise.resolve(newData);
    }
}
var $770aa835889377ba$export$2e2bcd8739ae039 = $770aa835889377ba$var$UserProfileApi;


class $56d91ce828a0cfd5$var$UserProfileService {
    constructor(){
        this.api = new (0, $770aa835889377ba$export$2e2bcd8739ae039)();
    }
    async getProfile() {
        return this.api.getProfile();
    }
    async updateProfile(newData) {
        return this.api.updateProfile(newData);
    }
}
var $56d91ce828a0cfd5$export$2e2bcd8739ae039 = $56d91ce828a0cfd5$var$UserProfileService;


class $1f453d7a9570a560$var$UserProfileController {
    constructor(){
        this.service = new (0, $56d91ce828a0cfd5$export$2e2bcd8739ae039)();
        this.state = {
            name: "",
            email: "",
            mobile: "",
            activeHours: "",
            lastActive: "",
            bio: "",
            isEditing: false
        };
        this.mainContainer = document.createElement("div");
        this.mainContainer.id = "UserProfileControllerContainer";
    }
    createInfoElement(label, value, isEditable = false) {
        const div = document.createElement("div");
        const infoLabel = document.createElement("span");
        infoLabel.textContent = label + ": ";
        div.appendChild(infoLabel);
        if (this.state.isEditing && isEditable) {
            const input = document.createElement("input");
            input.value = value;
            input.addEventListener("input", (e)=>{
                this.state[label.toLowerCase()] = e.target.value;
            });
            div.appendChild(input);
        } else {
            const infoValue = document.createElement("span");
            infoValue.textContent = value;
            div.appendChild(infoValue);
        }
        return div;
    }
    makeFieldsEditable() {
        this.state.isEditing = true;
        this.displayProfile();
    }
    async updateProfile() {
        const updatedData = await this.service.updateProfile(this.state);
        Object.assign(this.state, updatedData);
        this.state.isEditing = false;
        this.displayProfile();
    }
    async renderProfile() {
        const profileData = await this.service.getProfile();
        Object.assign(this.state, profileData);
        const container = document.createElement("div");
        container.classList.add("profile-content");
        const elements = [
            [
                "Name",
                profileData.name,
                true
            ],
            [
                "Email",
                profileData.email,
                true
            ],
            [
                "Mobile",
                profileData.mobile,
                true
            ],
            [
                "Active Hours",
                profileData.activeHours,
                true
            ],
            [
                "Last Active",
                profileData.lastActive
            ],
            [
                "Bio",
                profileData.bio,
                true
            ]
        ].map(([label, value, isEditable])=>this.createInfoElement(label, value, isEditable));
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", this.makeFieldsEditable.bind(this));
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", this.updateProfile.bind(this));
        container.append(...elements, editButton, updateButton);
        return container;
    }
    async displayProfile() {
        const newContent = await this.renderProfile();
        this.mainContainer.innerHTML = "";
        this.mainContainer.appendChild(newContent);
        this.updateDOM();
    }
    updateDOM() {
        const existingContainer = document.getElementById("UserProfileControllerContainer");
        if (existingContainer) existingContainer.replaceWith(this.mainContainer);
        else document.body.appendChild(this.mainContainer);
    }
    async getProfileContainer() {
        const newContent = await this.renderProfile();
        this.mainContainer.innerHTML = "";
        this.mainContainer.appendChild(newContent);
        return this.mainContainer;
    }
}
var $1f453d7a9570a560$export$2e2bcd8739ae039 = $1f453d7a9570a560$var$UserProfileController;



// Create instances of the controllers
const $783749aac7bd6663$var$loginController = new (0, $a1660e5edd3e7c3f$export$2e2bcd8739ae039)();
const $783749aac7bd6663$var$signUpController = new (0, $b0a9df180b29b920$export$2e2bcd8739ae039)();
const $783749aac7bd6663$var$logoutController = new (0, $633a8b471085ae93$export$2e2bcd8739ae039)();
const $783749aac7bd6663$var$userProfileController = new (0, $1f453d7a9570a560$export$2e2bcd8739ae039)(); // Creating an instance of UserProfileController
// Function to render content with navbar for User
function $783749aac7bd6663$export$d12c9f5127a0fbb(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild((0, $1ca3ff8333cff919$export$2136b4bcf93e0b3a)()); // Add the navbar
    appElement.appendChild(content);
}
// Define your user routes and controllers using page.js
page("/login", ()=>{
    $783749aac7bd6663$export$d12c9f5127a0fbb($783749aac7bd6663$var$loginController.getFormContainer());
});
page("/signup", ()=>{
    $783749aac7bd6663$export$d12c9f5127a0fbb($783749aac7bd6663$var$signUpController.renderSignUpForm());
});
page("/logout", ()=>{
    // Handle logout here using the LogoutController
    $783749aac7bd6663$var$logoutController.handleLogout();
});
// Using the UserProfileController instance named userProfileController
page("/profile", async ()=>{
    $783749aac7bd6663$export$d12c9f5127a0fbb(await $783749aac7bd6663$var$userProfileController.getProfileContainer());
});




class $caefe5518fa9c255$export$862a273d408fe7a1 {
    constructor(){
        this.authService = new (0, $2a6be8f4ab4753f9$export$2e2bcd8739ae039)();
    }
    async isSignedIn() {
        let activeUser = await this.authService.isLoggedin();
        console.log(activeUser);
        return activeUser;
    }
}


class $31cc228760813c66$var$DataStore {
    constructor(){
        this.friends = []; // Array to store friend objects
        this.activeFriend = null; // Currently active friend
        this.user = null;
    }
    setUser(user) {
        this.user = user;
        console.log(this.user);
    }
    // Method to search for friends based on a query
    searchFriends(query) {
        query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
        return this.friends.filter((friend)=>{
            // Customize the search criteria based on your needs
            // Here, we're searching by friend name
            return friend.name.toLowerCase().includes(query);
        });
    }
    // Method to set the active friend
    setActiveFriend(friend) {
        this.activeFriend = friend;
    }
    // Method to get the active friend
    getActiveFriend() {
        return this.activeFriend;
    }
    // Method to set the friends list
    setFriends(friends) {
        this.friends = friends;
    }
    // Method to add a new friend
    addFriend(friend) {
        this.friends.push(friend);
    }
    // Method to remove a friend
    removeFriend(friendId) {
        this.friends = this.friends.filter((friend)=>friend.id !== friendId);
    }
    // Method to update a friend's details
    updateFriend(friendId, updatedFriendData) {
        this.friends = this.friends.map((friend)=>{
            if (friend.id === friendId) return {
                ...friend,
                ...updatedFriendData
            };
            return friend;
        });
    }
    // Method to send a message to the active friend
    sendMessage(message) {
        if (this.activeFriend) {
            // Check if there's an active friend
            if (!this.activeFriend.messages) this.activeFriend.messages = []; // Initialize an empty array for messages
            this.activeFriend.messages.push(message); // Add the message to the active friend's messages
        }
    }
    // Method to add a message to a specific friend
    addMessage(friendId, message) {
        const friend = this.friends.find((friend)=>friend.id === friendId);
        if (friend) {
            if (!friend.messages) friend.messages = [];
            friend.messages.push(message);
        }
    }
    // Method to get messages from the active friend
    getMessages() {
        return this.activeFriend ? this.activeFriend.messages || [] : [];
    }
    // Method to update the last message with the active friend
    updateLastMessage(message) {
        if (this.activeFriend) this.activeFriend.lastMessage = message;
    }
}
var $31cc228760813c66$export$2e2bcd8739ae039 = $31cc228760813c66$var$DataStore;


class $2a768f5261cf8811$var$WebSocketService {
    constructor(serverURL){
        this.socket = null;
        this.serverURL = serverURL; // The URL of your WebSocket server
    }
    connect() {
        // Establish a WebSocket connection to the server
        this.socket = io(this.serverURL);
        this.socket.on("connect", ()=>{
            console.log("WebSocket connected.");
        });
    }
    disconnect() {
        // Close the WebSocket connection
        if (this.socket) this.socket.disconnect();
    }
    sendMessage(receiver, message) {
        if (this.socket) // Send a message to the server
        this.socket.emit("message", {
            receiver: receiver,
            message: message
        });
    }
    listenToMessages(callback) {
        if (this.socket) // Listen for incoming messages and invoke the callback with the message data
        this.socket.on("message", (data)=>{
            callback(data.message);
        });
    }
}
var $2a768f5261cf8811$export$2e2bcd8739ae039 = $2a768f5261cf8811$var$WebSocketService;


class $a971d7ffa2c6bb27$var$ChatController {
    constructor(store){
        this.controllerId = "chat-controller";
        this.store = store;
        this.component = this.createChatPlaceholder();
        this.webSocketService = new (0, $2a768f5261cf8811$export$2e2bcd8739ae039)("ws://localhost:3000"); // Inject the WebSocketService
        this.curentMessage = "";
    }
    createChatPlaceholder() {
        const chatControllerDiv = document.createElement("div");
        chatControllerDiv.id = this.controllerId;
        return chatControllerDiv;
    }
    async init() {
        this.appendChatToComponent();
        this.initWebSocket();
    }
    appendChatToComponent() {
        if (this.component) {
            const chatUI = this.createChatUI();
            this.component.appendChild(chatUI);
        }
    }
    createChatUI() {
        const chatUIContainer = document.createElement("div");
        chatUIContainer.classList.add("chat-ui-container");
        if (!this.store.getActiveFriend()) chatUIContainer.appendChild(this.createEmptyChatContainer());
        else {
            this.activeFriend = this.store.getActiveFriend();
            chatUIContainer.appendChild(this.createChatHeader());
            chatUIContainer.appendChild(this.createChatMessagesContainer());
            chatUIContainer.appendChild(this.createChatInputContainer());
        }
        return chatUIContainer;
    }
    // Create the empty chat container
    createEmptyChatContainer() {
        const emptyChatContainer = document.createElement("div");
        emptyChatContainer.classList.add("empty-chat-container");
        const chatComponentPlaceholder = document.createElement("div");
        chatComponentPlaceholder.classList.add("empty-chat-component");
        emptyChatContainer.appendChild(chatComponentPlaceholder);
        return emptyChatContainer;
    }
    // Create the chat header
    createChatHeader() {
        const chatHeader = document.createElement("div");
        chatHeader.classList.add("chat-header");
        chatHeader.appendChild(this.createProfilePic());
        chatHeader.appendChild(this.createFriendName());
        chatHeader.appendChild(this.createStatusDot());
        return chatHeader;
    }
    // Create the profile picture element
    createProfilePic() {
        const profilePic = document.createElement("img");
        profilePic.src = this.activeFriend.profilePic;
        profilePic.alt = this.activeFriend.name;
        profilePic.classList.add("profile-pic");
        return profilePic;
    }
    // Create the friend name element
    createFriendName() {
        const friendName = document.createElement("span");
        friendName.textContent = this.activeFriend.name;
        friendName.classList.add("friend-name");
        return friendName;
    }
    // Create the status dot element
    createStatusDot() {
        const statusDot = document.createElement("div");
        statusDot.classList.add("status-dot", this.activeFriend.status === "active" ? "active-status" : "inactive-status");
        return statusDot;
    }
    // Create the chat messages container
    createChatMessagesContainer() {
        const chatMessagesContainer = document.createElement("ul");
        chatMessagesContainer.classList.add("chat-messages");
        // Append existing messages to the chat messages container
        const messages = this.store.getMessages();
        messages.forEach((message)=>{
            this.appendMessageToChat(chatMessagesContainer, message);
        });
        return chatMessagesContainer;
    }
    // Create the chat input container
    createChatInputContainer() {
        const chatInputContainer = document.createElement("div");
        chatInputContainer.classList.add("chat-input");
        chatInputContainer.appendChild(this.createMessageInput());
        chatInputContainer.appendChild(this.createSendButton());
        return chatInputContainer;
    }
    // Create the message input field
    createMessageInput() {
        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type a message...";
        messageInput.classList.add("message-input");
        // Set the input value to the currentMessage
        messageInput.value = this.curentMessage;
        messageInput.addEventListener("change", (e)=>{
            // Update the currentMessage when the input changes
            this.currentMessage = e.target.value;
            console.log(this.currentMessage);
        });
        return messageInput;
    }
    // Create the send button
    createSendButton() {
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.classList.add("send-button");
        sendButton.addEventListener("click", ()=>{
            // Get the message from currentMessage
            const message = this.currentMessage.trim();
            if (message) {
                this.sendMessage(message);
                // Clear the input field after sending
                this.currentMessage = "";
                const messageInput = this.component.querySelector(".message-input");
                messageInput.value = "";
            }
        });
        return sendButton;
    }
    renderChat() {
        this.component.innerHTML = "";
        let chatComponent = this.createChatUI();
        this.component.appendChild(chatComponent);
        this.toggleChatDisplay();
    }
    getChatContainer() {
        return this.component;
    }
    showChatUI() {
        const chatUI = document.querySelector(".chat-ui-container");
        if (chatUI) {
            chatUI.style.display = "flex";
            this.hideFriendList();
        }
    }
    hideFriendList() {
        const friendList = document.querySelector(".friends-list");
        if (friendList) {
            friendList.style.display = "none";
            this.component.classList.add("chat-open");
        }
    }
    hideChatUI() {
        const chatUI = this.component.querySelector(".chat-ui-container");
        if (chatUI) {
            chatUI.style.display = "none";
            this.showFriendList();
        }
    }
    showFriendList() {
        const friendList = document.querySelector(".friends-list");
        if (friendList) {
            friendList.style.display = "block";
            this.component.classList.remove("chat-open");
        }
    }
    toggleCloseButton() {
        const chatToggleButton = document.createElement("button");
        chatToggleButton.classList.add("chat-toggle-button");
        chatToggleButton.textContent = "X";
        chatToggleButton.addEventListener("click", ()=>{
            this.hideChatUI();
        });
        const chatHeader = this.component.querySelector(".chat-header");
        chatHeader.appendChild(chatToggleButton);
    }
    scrollToBottom() {
        window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight);
    }
    toggleChatDisplay() {
        const chatUI = this.component.querySelector(".chat-ui-container");
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768 && chatUI && (chatUI.style.display === "none" || chatUI.style.display === "")) {
            this.showChatUI();
            this.toggleCloseButton();
            this.scrollToBottom();
        }
    }
    initWebSocket() {
        this.webSocketService.connect();
    }
    // Listen to incoming messages from the WebSocket
    listenToMessages() {
        this.webSocketService.listenToMessages((message)=>{
            // Handle incoming message
            this.handleIncomingMessage(message);
        });
    }
    // Handle incoming messages
    handleIncomingMessage(message) {
        // Implement your logic to display the incoming message in the chat UI
        const chatMessagesContainer = this.component.querySelector(".chat-messages");
        if (chatMessagesContainer) {
            const messageElement = document.createElement("li");
            messageElement.textContent = message;
            messageElement.classList.add("chat-message");
            chatMessagesContainer.appendChild(messageElement);
        }
    }
    // Send a message using the WebSocket
    sendMessage(message) {
        if (this.store.getActiveFriend()) {
            // Get the active friend's ID
            const activeFriendId = this.store.getActiveFriend().id;
            // Update the store with the sent message
            this.store.addMessage(activeFriendId, {
                text: message,
                sender: "user",
                timestamp: new Date().toISOString()
            });
            // Append the sent message to the chat messages container
            const chatMessagesContainer = this.component.querySelector(".chat-messages");
            if (chatMessagesContainer) this.appendMessageToChat(chatMessagesContainer, {
                text: message,
                sender: "user",
                timestamp: new Date().toISOString()
            });
            // Clear the currentMessage
            this.currentMessage = "";
            // Clear the input field
            const messageInput = this.component.querySelector(".message-input");
            messageInput.value = "";
        // You can also send the message to the server or perform other actions here
        }
    }
    appendMessageToChat(chatMessagesContainer, message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message.text;
        messageElement.classList.add("chat-message");
        // Determine the alignment of the message (left or right) based on sender
        if (message.sender === "user") messageElement.classList.add("user-message");
        else messageElement.classList.add("friend-message");
        // Create a <span> element for the timestamp
        const timestampSpan = document.createElement("span");
        timestampSpan.textContent = this.formatTimestamp(message.timestamp);
        timestampSpan.classList.add("chat-message-timestamp");
        // Create a <span> element for the status (default: single tick)
        const statusSpan = document.createElement("span");
        statusSpan.textContent = "✓"; // Single tick symbol
        statusSpan.classList.add("chat-message-status");
        // Append the timestamp and status <span> elements to the message element
        messageElement.appendChild(timestampSpan);
        messageElement.appendChild(statusSpan);
        chatMessagesContainer.appendChild(messageElement);
        // Scroll to the bottom to show the latest message
        this.scrollToBottom();
    }
    // Don't forget to disconnect the WebSocket when the chat is closed or the page is unloaded
    disconnectWebSocket() {
        this.webSocketService.disconnect();
    }
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
}
var $a971d7ffa2c6bb27$export$2e2bcd8739ae039 = $a971d7ffa2c6bb27$var$ChatController;


// FriendController.js
class $b1077317e702ff28$var$FriendAPI {
    // Simulated data for demonstration purposes (replace with actual API calls)
    static async getFriends() {
        return [
            {
                id: 1,
                name: "Brajesh Mishra",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey1",
                lastMessage: "",
                status: "active"
            },
            {
                id: 2,
                name: "Deepak Joshi",
                profilePic: "https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg",
                publicKey: "publicKey2",
                lastMessage: "",
                status: "InActive"
            }
        ];
    }
}
var $b1077317e702ff28$export$2e2bcd8739ae039 = $b1077317e702ff28$var$FriendAPI;


class $4b51ab602585c473$var$FriendService {
    async getFriends() {
        try {
            // Call the API to fetch friends
            const friends = await (0, $b1077317e702ff28$export$2e2bcd8739ae039).getFriends();
            return friends;
        } catch (error) {
            console.error("FriendService - Error fetching friends:", error);
            throw error;
        }
    }
}
var $4b51ab602585c473$export$2e2bcd8739ae039 = $4b51ab602585c473$var$FriendService;


class $ade47089842d66f2$var$FriendController {
    constructor(store){
        this.store = store;
        this.controllerId = "friend-controller";
        this.component = this.createFriendsPlaceholder(); // Create a placeholder for the component during construction
    }
    addChatController(controller) {
        this.chatController = controller;
    }
    // Initialize the controller (call this when the page loads)
    async init() {
        await this.loadFriends(); // Load friends from the server or mock data
        // Append the friend list to the placeholder
        this.appendFriendsToComponent();
    }
    // Load friends from the service
    async loadFriends() {
        try {
            const friendService = new (0, $4b51ab602585c473$export$2e2bcd8739ae039)();
            this.friends = await friendService.getFriends();
            this.store.setFriends(this.friends);
        } catch (error) {
            console.error("FriendController - Load Friends error:", error);
        }
    }
    // Method to set a friend as active
    setActiveFriend(friend) {
        this.store.setActiveFriend(friend);
        this.chatController.renderChat();
    }
    // Method to render the active friend's information and messages in the UI
    renderActiveFriend() {
        // Implement this method to update the UI with the active friend's details
        if (this.activeFriend) {
            // Create the chat UI for the active friend
            const chatUI = this.chatController.createChatUI();
            // Find the chat container and replace its content with the chat UI
            const chatContainer = document.querySelector(".chat-ui-container");
            if (chatContainer) {
                chatContainer.innerHTML = ""; // Clear existing content
                chatContainer.appendChild(chatUI); // Append the chat UI
            }
        }
    }
    // Method to create a placeholder for the friends component
    createFriendsPlaceholder() {
        // Create a div with the friend-controller ID
        const friendControllerDiv = document.createElement("div");
        friendControllerDiv.id = this.controllerId;
        return friendControllerDiv;
    }
    // Method to append the friends list to the component
    appendFriendsToComponent() {
        if (this.component) {
            // Create a friends list container
            const friendsListContainer = this.createFriendsComponent();
            this.component.appendChild(friendsListContainer);
        }
    }
    // Method to create the friends component
    createFriendsComponent() {
        const friendsListContainer = document.createElement("div");
        friendsListContainer.classList.add("friends-list");
        // Loop through the friends and create a list item for each
        this.friends.forEach((friend)=>{
            const friendListItem = document.createElement("div");
            friendListItem.classList.add("friend-list-item");
            // Create a circular status dot based on the friend's status
            const statusDot = document.createElement("div");
            statusDot.classList.add("status-dot", friend.status === "active" ? "active-status" : "inactive-status");
            // Create a profile picture element for the friend
            const profilePic = document.createElement("img");
            profilePic.src = friend.profilePic;
            profilePic.alt = friend.name;
            profilePic.classList.add("profile-pic");
            // Create a name element for the friend
            const nameElement = document.createElement("span");
            nameElement.textContent = friend.name;
            nameElement.classList.add("friend-name");
            // Create a last message element for the friend
            const lastMessageElement = document.createElement("span");
            lastMessageElement.textContent = friend.lastMessage;
            lastMessageElement.classList.add("friend-last-message");
            // Add a click event listener to set the friend as active when clicked
            friendListItem.addEventListener("click", ()=>{
                console.log(friend);
                this.setActiveFriend(friend);
            });
            // Append the status dot, profile picture, name, and last message to the list item
            friendListItem.appendChild(statusDot);
            friendListItem.appendChild(profilePic);
            friendListItem.appendChild(nameElement);
            friendListItem.appendChild(lastMessageElement);
            friendListItem.addEventListener("click", ()=>{
                this.setActiveFriend(friend); // Trigger setActiveFriend when a friend is clicked
                this.chatController.toggleChatDisplay();
            });
            // Append the list item to the friends list container
            friendsListContainer.appendChild(friendListItem);
        });
        // Return the friends list container
        return friendsListContainer;
    }
    // Method to get the friends container for rendering
    getFriendsContainer() {
        return this.component;
    }
}
var $ade47089842d66f2$export$2e2bcd8739ae039 = $ade47089842d66f2$var$FriendController;


class $5e51181eae3e781c$var$CommunicationController {
    constructor(){
        this.dataStore = new (0, $31cc228760813c66$export$2e2bcd8739ae039)();
        this.controllerId = "communication-controller";
        this.friendController = new (0, $ade47089842d66f2$export$2e2bcd8739ae039)(this.dataStore);
        this.chatController = new (0, $a971d7ffa2c6bb27$export$2e2bcd8739ae039)(this.dataStore);
    }
    async init(user) {
        this.friendController.init();
        this.chatController.init();
        this.friendController.addChatController(this.chatController);
        this.dataStore.setUser(user);
    }
    getCommunicationContainer() {
        const communicationControllerDiv = document.createElement("div");
        communicationControllerDiv.id = this.controllerId;
        const friendContainer = this.friendController.getFriendsContainer();
        const chatContainer = this.chatController.getChatContainer();
        communicationControllerDiv.appendChild(friendContainer);
        communicationControllerDiv.appendChild(chatContainer);
        console.log(communicationControllerDiv);
        return communicationControllerDiv;
    }
}
var $5e51181eae3e781c$export$2e2bcd8739ae039 = $5e51181eae3e781c$var$CommunicationController;


// Create an instance of the FriendController
const $9e05e959dd3eb31f$var$communicationController = new (0, $5e51181eae3e781c$export$2e2bcd8739ae039)();
const $9e05e959dd3eb31f$var$authController = new (0, $caefe5518fa9c255$export$862a273d408fe7a1)();
// Flag to track if friends list has been initialized
let $9e05e959dd3eb31f$var$friendsListInitialized = false;
function $9e05e959dd3eb31f$export$b248976272691a(content) {
    const appElement = document.getElementById("app");
    appElement.innerHTML = ""; // Clear the app div
    appElement.appendChild((0, $1ca3ff8333cff919$export$2136b4bcf93e0b3a)()); // Add the navbar
    appElement.appendChild(content);
}
// Define your friend routes using page.js
page("/friends", ()=>{
    console.log("started");
    $9e05e959dd3eb31f$var$authController.isSignedIn().then((data)=>{
        if (!data.error && data.user != null) {
            if (!$9e05e959dd3eb31f$var$friendsListInitialized) $9e05e959dd3eb31f$var$communicationController.init(data.user).then(()=>{
                $9e05e959dd3eb31f$export$b248976272691a($9e05e959dd3eb31f$var$communicationController.getCommunicationContainer());
                $9e05e959dd3eb31f$var$friendsListInitialized = true;
            });
            else // Friends list has already been initialized, just render it
            $9e05e959dd3eb31f$export$b248976272691a($9e05e959dd3eb31f$var$communicationController.getCommunicationContainer());
        } else window.location.href = "/login";
    });
});


// Start page.js routing
page();




//# sourceMappingURL=app.js.map
