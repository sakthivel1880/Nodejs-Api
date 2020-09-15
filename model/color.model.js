const mongoose = require('mongoose');

var colorchema = new mongoose.Schema({
    color : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('color', colorchema);