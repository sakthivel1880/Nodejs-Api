const express=require('express');
var router=express.Router();
const mongoose = require('mongoose');

//Model
const Aboutus = mongoose.model('aboutu');

const selectabout = async(req, res)=>{
    try {
        await Aboutus.find((err, docs)=>{
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
    selectabout
}