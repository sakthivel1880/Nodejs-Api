const mongoose = require('mongoose');

var termschema = new mongoose.Schema({
    terms : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('term', termschema);