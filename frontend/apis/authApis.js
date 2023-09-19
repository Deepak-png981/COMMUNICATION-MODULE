import { CookieService } from "../services/CookieServices.js";

class AuthAPI {

    constructor() {
        this.cookieService = new CookieService()
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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email, name }),
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
                method: "POST", // You can use POST or any suitable HTTP method for logout
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

            if (!token) {
                // Token not found, user is not authenticated
                return {error : "token not found"}
            }

            // Perform the actual API request to check the current user's status
            const response = await fetch("/auth/getCurrentUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include the bearer token here
                },
            });

            let data = await response.json()

            return data;
        } catch (error) {
            console.error("AuthAPI - Check current user error:", error);
            throw error; // Propagate the error
        }
    }

    // Other authentication-related API methods can be added here
}

export default AuthAPI;
