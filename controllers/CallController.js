const CallService = require('../services/CallService');

class CallController {
    static async handleInitiateCall(socket, data) {
        const { from, to, type } = data;
        await CallService.initiateCall(from, to, type);
        socket.emit('callInitiated', { from, to, type });
        socket.to(to).emit('callReceived', { from, to, type });
    }
}

module.exports = CallController;
