const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//Model
const Message = mongoose.model('message');
const Subscribe = mongoose.model('subscribe');
const Register = mongoose.model('register');
const Profile = mongoose.model('profile');

//Enquiry
router.get('/enquiry/select/', (req, res) => {
    Message.find((err, docs) => {
        if (!err)
            res.send(docs);
    });
});

router.post('/enquiry/delete/', (req, res) => {
    Message.findByIdAndRemove(req.body.id, (err, docs) => {
        if (!err)
            res.send({ success: 1 });
        else
            res.send(err);
    })
});


//Subscribe
router.get('/subscribe/select/', (req, res) => {
    Subscribe.find((err, docs) => {
        if (!err)
            res.send(docs);
    });
});


//Users
router.get('/users/select/', (req, res) => {
    Register.find((err, docs) => {
        if (!err)
            res.send(docs);
    });
});

// router.post('/users/delete/', (req, res) => {
//     Message.findByIdAndRemove(req.body.id, (err, docs) => {
//         if (!err)
//             res.send({ success: 1 });
//         else
//             res.send(err);
//     })
// });


//Profile
router.get('/profile/select/', (req, res) => {
    Profile.find((err, docs) => {
        if (!err)
            res.send(docs);
    });
});

module.exports = router;