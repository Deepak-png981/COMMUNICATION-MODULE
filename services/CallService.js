const CallModel = require('../models/CallModel');

class CallService {
    static async initiateCall(from, to, type) {
        const call = new CallModel({
            from,
            to,
            type,
            timestamp: new Date(),
        });
        await call.save();
    }
}

module.exports = CallService;
