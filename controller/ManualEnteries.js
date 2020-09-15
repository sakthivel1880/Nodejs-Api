const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
// const Color = require('hex-to-color-name');

//Models
const Units = mongoose.model('unit');
const Tax = mongoose.model('tax');
const Color = mongoose.model('color');

//Unique Generation
var uuid = require('uuid');

//Units
router.get('/units/select/', (req, res)=>{
    Units.find((err, docs) =>{
        if(!err){
            res.send(docs);
        }
    });
});

router.post('/units/add/', (req, res)=>{
    var units = new Units();
    units.fullname = req.body.formdata.fullname;
    units.shortname = req.body.formdata.shortname;
    units.created_at = Date.now();
    units.save((err, docs) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
          //  console.log(docs);
            res.send("success");
        } 
        
    });
});

router.post('/units/update', (req , res) =>{
    Units.findByIdAndUpdate({_id:req.body.formdata.uniqueid}, req.body.formdata,{new:true},(err, docs)=>{
        if (err) {
            console.log('Error during record Updation : ' + err);
        } else {
         //   console.log(docs);
            res.send("success");
        } 
    });
});

router.post('/units/delete/' ,(req, res)=>{
    Units.findByIdAndRemove(req.body.data,(err, docs)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
          //  console.log(docs);
            res.send("success");
        } 
    });
});


//Tax Details
router.get('/tax/select/', (req, res) =>{
    Tax.find((err, docs) =>{
        if(!err){
            res.send(docs);
        }
    });
});

router.post('/tax/add/',(req, res) =>{
    var tax = new Tax();
    tax.SGST = req.body.formdata.SGST;
    tax.CGST = req.body.formdata.CGST;
    tax.created_at = Date.now();
    tax.save((err, docs) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
         //   console.log(docs);
            res.send("success");
        } 
    });
});

router.post('/tax/update/', (req, res) =>{
    Tax.findByIdAndUpdate({_id : req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs) =>{
        if (err) {
            console.log('Error during record updation : ' + err);
        } else {
          //  console.log(docs);
            res.send("success");
        } 
    });
});

router.post('/tax/delete/', (req, res) =>{
    Tax.findByIdAndRemove(req.body.data, (err, docs)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
           // console.log(docs);
            res.send("success");
        } 
    });
});


//Color Name
router.get('/color/select/', (req, res) =>{
   Color.find((err, docs) =>{
       if(!err){
           res.send(docs);
       }
   });
});

router.post('/color/add/', (req, res)=>{
    var color = new Color();
    color.color = req.body.formdata.color;
    color.created_at = Date.now();
    color.save((err, docs) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
          //  console.log(docs);
            res.send("success");
        } 
    });
});

router.post('/color/update', (req, res) =>{
    Color.findByIdAndUpdate({_id : req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs) =>{
        if (err) {
            console.log('Error during record updation : ' + err);
        } else {
           // console.log(docs);
            res.send("success");
        } 
    });
});

router.post('/color/delete/', (req, res) =>{
    Color.findByIdAndRemove(req.body.data, (err, docs)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
           // console.log(docs);
            res.send("success");
        } 
    });
});



module.exports = router;