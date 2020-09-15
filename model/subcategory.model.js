const mongoose = require('mongoose');

var subcategorychema = new mongoose.Schema({
    category_id : {
        type:mongoose.Schema.ObjectId,
        ref: 'Category',
        required:true
    },
    subcategory : {
        type:String,
        required:true
    },
    created_at:{
        type: Date
    }
});

mongoose.model('subcategory', subcategorychema);