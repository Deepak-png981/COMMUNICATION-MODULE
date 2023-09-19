const UserService = require('../services/UserService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    getUserProfile = async (req, res) => {
        const user = await this.userService.getUserById(req.params.id);
        if (user) {
            // Return limited user information
            const limitedUser = {
                username: user.username,
                email: user.email,
                name: user.name,
                profilePicture: user.profilePicture,
                bio: user.bio,
            };
            res.json(limitedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    updateUserProfile = async (req, res) => {
        const updatedUser = await this.userService.updateUserProfile(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    searchUsers = async (req, res) => {
        const query = req.query.query;
        const users = await this.userService.searchUsers(query);
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    }

    getUsers = async (req, res) => {
        try {
            const { page, limit } = req.query;
            const users = await this.userService.getUsers(limit, page);
            const usersWithPublicKey = users.map((user) => ({
                ...user.toObject(),
                publicKey: user.publicKey,
            }));
            res.json(usersWithPublicKey);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController;
