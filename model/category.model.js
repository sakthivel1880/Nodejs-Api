const mongoose = require('mongoose');

var categorychema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
});

mongoose.model('category', categorychema);