const mongoose = require('mongoose');

var aboutuschema = new mongoose.Schema({
    aboutus : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('aboutu', aboutuschema);