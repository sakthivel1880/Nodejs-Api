const express=require('express');
var router=express.Router();
const mongoose = require('mongoose');

//Model
const Banner = mongoose.model('banner');
const Common = mongoose.model('common');
const Special = mongoose.model('special');

const selectbanner = async(req, res)=>{
    try {
        await Banner.find((err, docs)=>{
            if(err)
            console.log("error aboutus selection"+err);
            else
            res.send(docs);
        })
    }
    catch {
        throw Error("Error Bad Request.")
    }
}

const selectcommon = async(req, res)=>{
    try {
        await Common.find((err, docs)=>{
            if(err)
            console.log("error aboutus selection"+err);
            else
            res.send(docs);
        })
    }
    catch {
        throw Error("Error Bad Request.")
    }
}


const selectspecial = async(req, res)=>{
    try {
        await Special.find((err, docs)=>{
            if(err)
            console.log("error aboutus selection"+err);
            else
            res.send(docs);
        })
    }
    catch {
        throw Error("Error Bad Request.")
    }
}

module.exports={
    selectbanner,
    selectcommon,
    selectspecial
}