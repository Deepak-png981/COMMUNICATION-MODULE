import AuthAPI from '../apis/authApis.js';

class AuthService {
    constructor() {
        this.authAPI = new AuthAPI();
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

    async signup(credentials) {
        try {
            // Call the signup method from the AuthAPI
            const response = await this.authAPI.signup(credentials.username, credentials.password, credentials.email, credentials.name);

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

    async isLoggedin(){
        const currentUser = await this.authAPI.getCurrentUser();
        return currentUser
    }

    // Other authentication-related methods can be added here
}

export default AuthService;
