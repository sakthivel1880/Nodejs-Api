const mongoose = require('mongoose');

var privacyschema = new mongoose.Schema({
    privacy : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('privacy', privacyschema);