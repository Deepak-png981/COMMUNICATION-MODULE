const UserModel = require('../models/UserModel');

class UserService {
    constructor() {
        // Constructor to initialize any dependencies or configurations
    }

    async getUserById(id) {
        return await UserModel.findById(id);
    }

    async updateUserProfile(id, profileData) {
        return await UserModel.findByIdAndUpdate(id, profileData, { new: true });
    }

    async getUsers(limit, pageNumber) {
        // Implement the logic to fetch users with pagination
        const skip = ((pageNumber || 1) - 1) * (limit || 10);
        const users = await UserModel.find({})
            .skip(skip)
            .limit(limit || 10)
            .select('username email name profilePicture bio publicKey');
        return users;
    }

    async searchUsers(query) {
        return await UserModel.find({ username: new RegExp(query, 'i') });
    }
}

module.exports = UserService;
