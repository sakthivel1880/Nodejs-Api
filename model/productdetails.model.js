const mongoose = require('mongoose');

var productdetailsschema = new mongoose.Schema({
    category_id : {
        type:mongoose.Schema.ObjectId,
        ref: 'category',
        required:true
    },
    subcategory_id : {
        type:mongoose.Schema.ObjectId,
        ref: 'subcategory',
        required:true
    },
    modelname : {
        type : String
    },
    hsncode : {
        type : String
    },
    unitprice : {
        type : Number
    },
    sgst : {
        type : String
    },
    cgst : {
        type : String
    },
    offer : {
        type : Number
    },
    finalprice : {
        type : Number
    },
    sgstamount : {
        type : Number
    },
    cgstamount : {
        type : Number
    },
    totaltax : {
        type : Number
    },
    offeramount : {
        type : Number
    },
    product_type : {
        type : String
    },
    size : {
        type : String
    },
    color : {
        type : String
    },
    mainimage : {
        type : String
    },
    secondimage : {
        type : String
    },
    thirdimage : {
        type : String
    },
    fourthimage : {
        type : String
    },
    fifthimage : {
        type : String
    },
    specification : {
        type : String
    },
    features : {
        type : String
    },
    created_at : {
        type : Date
    }
});

mongoose.model('productdetails', productdetailsschema);