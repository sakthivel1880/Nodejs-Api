const mongoose = require('mongoose');

var shippngschema = new mongoose.Schema({
    shipping : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('shipping', shippngschema);