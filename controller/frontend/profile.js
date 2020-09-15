const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//Model
const Profile = mongoose.model('profile');

const addprofile = async(req, res) => {
    try {
        var profile = new Profile();
        profile.user_id = req.body.registerid;
        profile.fullname = req.body.fullname;
        profile.mobile = req.body.mobile;
        profile.landmark = req.body.landmark;
        profile.city = req.body.city;
        profile.addresstype = req.body.addresstype;
        profile.address = req.body.address;
        profile.created_at = Date.now();
        profile.save((err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send({ success: 1 });
        })

    } catch {
        throw Error("Error Bad Request.");
    }
}

const getprofile = async(req, res) => {
    try {
        await Profile.find({ user_id: req.body.id }, (err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(docs);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const updateprofile = async(req, res) => {
    try {
        await Profile.findByIdAndUpdate({ _id: req.body.formdata.profileid }, req.body.formdata, { new: true }, (err, docs) => {
            if (err) {
                console.log('Error during record updation : ' + err);
            } else {
                res.send({ success: 1 });
            }
        });
    } catch {
        throw Error("Error Bad Request.");
    }
}


module.exports = {
    addprofile,
    getprofile,
    updateprofile,
}