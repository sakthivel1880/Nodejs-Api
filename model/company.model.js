const mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    phone: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    created_at:{
        type: Date
    }
});

// Custom validation for email
companySchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('company', companySchema);