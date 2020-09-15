const mongoose = require('mongoose');

var whishlistschema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'register',
        required: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'productdetails',
        required: true
    },
    created_at: {
        type: Date
    }
});

mongoose.model('whishlist', whishlistschema);