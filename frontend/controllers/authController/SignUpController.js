import AuthService from '../../services/AuthService.js';

class SignUpController {
    constructor() {
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
        this.authService = new AuthService();
    }

    handleInputChange(e) {
        const { name, value } = e.target;
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
        if (Object.values(validationErrors).some((error) => error !== "")) {
            this.state.validationErrors = validationErrors; // Update validation errors
            this.updateDOM(); // Update the DOM to display error messages
            return;
        }

        // If validation is successful, proceed with sign-up
        try {
            const response = await this.authService.signup(this.state);

            if (response.token) {
                this.isLoggedIn = true;
                document.cookie = `token=${response.token}; path=/`;
                window.location.href = "/friends"; // Redirect to the home page
                return
            } else {
                this.isLoggedIn = false;
                // Handle login failure (display error message, etc.)
                console.error("Signup failed.");
            }
        } catch (error) {
            console.error("An error occurred during sign-up:", error);
        }
    }

    validateForm() {
        const { email, name, username, password, confirmPassword } = this.state;
        const validationErrors = {
            email: "",
            name: "",
            username: "",
            password: "",
            confirmPassword: ""
        };

        // Validation logic for each field
        if (!email || !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
            validationErrors.email = "Invalid email address";
        }

        if (!name || name.length < 8) {
            validationErrors.name = "Name must be at least 8 characters";
        }

        if (!username || username.length < 8) {
            validationErrors.username = "Username must be at least 8 characters";
        }

        if (!password || !password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/)) {
            validationErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters";
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

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
            { label: 'Email', type: 'email', name: 'email', value: this.state.email, maxLength: 50 },
            { label: 'Name', type: 'text', name: 'name', value: this.state.name, maxLength: 50 },
            { label: 'Username', type: 'text', name: 'username', value: this.state.username, maxLength: 30 },
            { label: 'Password', type: 'password', name: 'password', value: this.state.password, maxLength: 20 },
            { label: 'Confirm Password', type: 'password', name: 'confirmPassword', value: this.state.confirmPassword, maxLength: 20 }
        ];

        fields.forEach(({ label, type, name, value, maxLength }) => {
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
        form.querySelectorAll(".form-row").forEach((formRow) => {
            const fieldName = formRow.querySelector("input").name;
            const errorElement = formRow.querySelector(".error-message");
            errorElement.textContent = this.state.validationErrors[fieldName];
        });
    }

    getFormContainer() {
        return this.formContainer;
    }
}

export default SignUpController;