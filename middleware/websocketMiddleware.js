module.exports = function attachWebSocketInstance(ss) {
    return function (req, res, next) {
        // Add the io instance to the req object
        req.ss = ss;

        // Continue with the next middleware or route handler
        next();
    };
};