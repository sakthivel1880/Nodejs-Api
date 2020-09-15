const mongoose = require('mongoose');

var cartschema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date
    }
});

mongoose.model('cart', cartschema);