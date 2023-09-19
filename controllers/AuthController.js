const AuthService = require('../services/AuthService')

const authService = new AuthService()
class AuthController {
    async signUp(req, res) {
        try {
            const { username, password, email, name } = req.body;
            const token = await authService.signUp(username, password, email, name);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username);
            const token = await authService.login(username, password);
            if (token) {
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const currentUser = await authService.getCurrentUser(req);
            console.log(currentUser);
            if (currentUser) {
                res.status(200).json({ user: currentUser });
            } else {
                res.status(401).json({ error: 'Unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = AuthController;