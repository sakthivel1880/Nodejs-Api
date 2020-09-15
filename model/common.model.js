const mongoose = require('mongoose');

var commonSchema = new mongoose.Schema({
    subcategory_id: {
        type:mongoose.Schema.ObjectId,
        ref: 'Subcategory',
        required:true
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    mobile: {
        type: Number
    },
    name: {
        type: String
    }
});


mongoose.model('common', commonSchema);