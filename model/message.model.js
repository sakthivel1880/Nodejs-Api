const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    created_at: {
        type: Date
    }
});


mongoose.model('message', messageSchema);