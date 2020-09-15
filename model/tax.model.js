const mongoose = require('mongoose');

var taxchema = new mongoose.Schema({
    SGST : {
        type:String,
        required:true
    },
    CGST : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('tax', taxchema);