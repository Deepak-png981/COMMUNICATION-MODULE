const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NodeRSA = require('node-rsa'); 

const FriendSchema = new mongoose.Schema({
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the friend
        required: true,
    },
    lastMessage: String, // Last message exchanged with the friend
    dateOfFriendship: {
        type: Date,
        default: Date.now, // Default to the current date when the friendship was established
    },
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePicture: String,
    bio: String,
    email: String,
    name: String,
    friends: [FriendSchema], // Array of friend objects
    activeHours: [
        {
            startTime: Date, // Start time of the active hour
            endTime: Date,   // End time of the active hour
        }
    ],
    lastActive: Date, // Date of last activity
    publicKey: String, // Public key for RSA encryption
    privateKey: String, // Private key for RSA encryption
});

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next(); // Skip password hashing if it's not modified
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateRSAKeys = function () {
    // Generate RSA key pair
    const key = new NodeRSA({ b: 1024 }); // You can adjust the key size as needed
    this.publicKey = key.exportKey('public');
    this.privateKey = key.exportKey('private');
};

UserSchema.methods.encryptWithPublicKey = function (data) {
    const key = new NodeRSA(this.publicKey);
    return key.encrypt(data, 'base64');
};

// RSA decryption method
UserSchema.methods.decryptWithPrivateKey = function (encryptedData) {
    const key = new NodeRSA(this.privateKey);
    return key.decrypt(encryptedData, 'utf8');
};

UserSchema.methods.getUser = function () {
    return {
        _id : this._id,
        username: this.username,
        email: this.email,
        name: this.name,
        profilePicture: this.profilePicture,
        bio: this.bio,
        friends: this.friends,
        activeHours: this.activeHours,
        lastActive: this.lastActive,
    };
};


module.exports = mongoose.model('User', UserSchema);