const mongoose = require('mongoose');

var unitschema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    shortname : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('unit', unitschema);