const mongoose = require('mongoose');

var profileschema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'register',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addresstype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
});

mongoose.model('profile', profileschema);