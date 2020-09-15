const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const upload = require('../middleware/fileupload');

//Models
const Banner = mongoose.model('banner');
const Common = mongoose.model('common');
const Special = mongoose.model('special');
const Subcategory = mongoose.model('subcategory');

//Unique Generation
var uuid = require('uuid');


//Subcategory
router.get('/ads/subcategory/', (req, res)=>{
    Subcategory.find((err, docs)=>{
        if(!err)
        res.send(docs);
    });
});


//Banner Ad
router.get('/bannerad/select',(req, res)=>{
    Banner.aggregate([
        { 
            $lookup: {
                from: 'subcategories',
                localField: 'subcategory_id',
                foreignField: '_id',
                as: "subcategories"
            }           
        },
        
    ]).exec(function(err, result) {
        if(!err)
        {
        res.send(result);
        }
        else
        {
            res.send(err);
        }
    }); 
});


router.post('/bannerad/add',upload.uploadad, function (req, res, next){ 
    var banner = new Banner();
    banner.subcategory_id = req.body.subcategory;
    banner.image= req.files['image'][0]['filename'];
    banner.link = req.body.link;
    banner.mobile = req.body.mobile;
    banner.name = req.body.name;
    banner.save((err, docs) =>{
        if(err)
        console.log("Error inserting data"+err);
        else
        res.send('success');
    });
} );

router.post('/bannerad/update', (req, res) =>{
    Banner.findByIdAndUpdate({_id:req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs)=>{
        if(err)
        console.log("Error updating data"+err);
        else
        res.send('success');
    });
});

router.post('/bannerad/delete/', (req, res) =>{
    Banner.findByIdAndRemove(req.body.data, (err, docs)=>{
        if(err)
        console.log("Error deleting data"+err);
        else
        res.send('success');
    });
});


//Common Ad
router.get('/commonad/select',(re, res)=>{
    Common.aggregate([
        { 
            $lookup: {
                from: 'subcategories',
                localField: 'subcategory_id',
                foreignField: '_id',
                as: "subcategories"
            }           
        },
        
    ]).exec(function(err, result) {
        if(!err)
        {
        res.send(result);
        }
        else
        {
            res.send(err);
        }
    }); 
});


router.post('/commonad/add',upload.uploadad, function (req, res, next){ 
    var common = new Common();
    common.subcategory_id = req.body.subcategory;
    common.image= req.files['image'][0]['filename'];
    common.link = req.body.link;
    common.mobile = req.body.mobile;
    common.name = req.body.name;
    common.save((err, docs) =>{
        if(err)
        console.log("Error inserting data"+err);
        else
        res.send('success');
    });
} );

router.post('/commonad/update', (req, res) =>{
    Common.findByIdAndUpdate({_id:req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs)=>{
        if(err)
        console.log("Error updating data"+err);
        else
        res.send('success');
    });
});

router.post('/commonad/delete/', (req, res) =>{
    Common.findByIdAndRemove(req.body.data, (err, docs)=>{
        if(err)
        console.log("Error deleting data"+err);
        else
        res.send('success');
    });
});



//Common Ad
router.get('/specialad/select',(re, res)=>{
    Special.aggregate([
        { 
            $lookup: {
                from: 'subcategories',
                localField: 'subcategory_id',
                foreignField: '_id',
                as: "subcategories"
            }           
        },
        
    ]).exec(function(err, result) {
        if(!err)
        {
        res.send(result);
        }
        else
        {
            res.send(err);
        }
    }); 
});


router.post('/specialad/add',upload.uploadad, function (req, res, next){ 
    var special = new Special();
    special.subcategory_id = req.body.subcategory;
    special.image= req.files['image'][0]['filename'];
    special.link = req.body.link;
    special.mobile = req.body.mobile;
    special.name = req.body.name;
    special.save((err, docs) =>{
        if(err)
        console.log("Error inserting data"+err);
        else
        res.send('success');
    });
} );

router.post('/specialad/update', (req, res) =>{
    Special.findByIdAndUpdate({_id:req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs)=>{
        if(err)
        console.log("Error updating data"+err);
        else
        res.send('success');
    });
});

router.post('/specialad/delete/', (req, res) =>{
    Special.findByIdAndRemove(req.body.data, (err, docs)=>{
        if(err)
        console.log("Error deleting data"+err);
        else
        res.send('success');
    });
});


module.exports = router;