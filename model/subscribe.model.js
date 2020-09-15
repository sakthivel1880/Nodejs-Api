const mongoose = require('mongoose');

var subscribeschema = new mongoose.Schema({
    email : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('subscribe', subscribeschema);