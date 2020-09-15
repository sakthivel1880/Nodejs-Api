const mongoose = require('mongoose');

var registerchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    mobile : {
        type:Number,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('register', registerchema);