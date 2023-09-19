const mongoose = require('mongoose');

class Database {
    static connect() {
        // mongoose.connect('mongodb://127.0.0.1:27017/shunyaComm', {
        mongoose.connect('mongodb+srv://nodejsDeepak:nodejsDeepak@cluster0.lnx1ekk.mongodb.net/shunyaComm?', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('conected');
        })

    }
}

module.exports = Database;
