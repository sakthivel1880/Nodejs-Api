const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Model
const Register = mongoose.model('register');


const insertregister = async(req, res) => {
    try {

        var regsiter = new Register();
        regsiter.name = req.body.name;
        regsiter.email = req.body.email;
        regsiter.mobile = req.body.mobile;
        regsiter.password = bcrypt.hashSync(req.body.password, 10);
        regsiter.password = Date.now();

        await Register.find({ email: req.body.email }, (errrow, docsrow) => {
            if (!docsrow.length) {
                regsiter.save((err, docs) => {
                    if (err) {
                        console.log('Error during record insertion : ' + err);
                    } else {
                        var objs = { success: 1, data: docs }
                        res.send(objs);
                    }

                });
            } else {
                var objs = { success: 0 }
                res.send(objs);
            }
        });

    } catch (err) {
        throw Error("Error bad request.");
    }
}

const loginselect = async(req, res) => {
    try {
        await Register.findOne({ email: req.body.email }, (err, docs) => {
            if (err) {
                console.log("Error during record selection:" + err);
            } else if (docs) {
                if (bcrypt.compareSync(req.body.password, docs.password))
                    res.send({ success: 1, data: docs._id });
                else
                    res.send({ success: 2 });
            } else {
                res.send({ success: 0 });
            }
        })
    } catch {
        throw Error("Error bad request.");
    }
}

module.exports = {
    insertregister,
    loginselect,
}