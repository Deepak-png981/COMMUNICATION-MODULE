import AuthService from "../../services/AuthService.js"

class AuthController{
    constructor(){
        this.authService = new AuthService()
    }

    async isSignedIn(){
        let activeUser = await this.authService.isLoggedin()
        console.log(activeUser);
        return activeUser
    }
}

export {AuthController}