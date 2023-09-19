const jwt = require('jsonwebtoken');

class JwtHelper {
    static generateToken(payload) {
        return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1h' });
    }

    static verifyToken(token) {
        return jwt.verify(token, 'SECRET_KEY');
    }
}

module.exports = JwtHelper;
