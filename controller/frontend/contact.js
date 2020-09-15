const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//Model
const Message = mongoose.model('message');
const Company = mongoose.model('company');
const Social = mongoose.model('socialmedia');
const Subscribe = mongoose.model('subscribe');

const message = async(req, res) => {
    try {
        var message = new Message();
        message.name = req.body.name;
        message.email = req.body.email;
        message.message = req.body.message;
        message.created_at = Date.now();

        await message.save((err, doc) => {
            if (err)
                console.log("Error data insertion" + err);
            else
                res.send({ success: 1 });
        })
    } catch {
        throw Error("Error bad request.");
    }
}

const selectcontact = async(req, res) => {
    try {
        await Company.find((err, doc) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(doc);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const selectsocail = async(req, res) => {
    try {
        await Social.find((err, doc) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(doc);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const subscribe = async(req, res) => {
    try {

        var subscribe = new Subscribe();
        subscribe.email = req.body.email;
        subscribe.created_at = Date.now();

        await Subscribe.find({ email: req.body.email }, (errrow, docsrow) => {
            if (!docsrow.length) {
                subscribe.save((err, docs) => {
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

module.exports = {
    message,
    selectcontact,
    selectsocail,
    subscribe
}