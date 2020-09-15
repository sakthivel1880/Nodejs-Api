const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const upload = require('../middleware/fileupload');

//Models
const Category = mongoose.model('category');
const Subcategory = mongoose.model('subcategory');
const Tax = mongoose.model('tax');
const ProductDetails = mongoose.model('productdetails');

//Unique Generation
var uuid = require('uuid');


//Manual Select

router.get('/subcategory/category/',(req, res) =>{
    Category.find((err, docs) =>{
        if(!err){
            res.send(docs);
    }
    });
});

router.post('/subcategory/subcategory/',(req, res) =>{
    Subcategory.find({"category_id":req.body.formdata.category}, (err, docs) =>{
        if(!err){
            res.send(docs);
    } else {
        console.log(err);
    }
    });
});

router.get('/subcategory/tax/',(req, res) =>{
    Tax.find((err, docs) =>{
        if(!err){
            res.send(docs);
    }
    });
});


//Category Name
router.get('/category/select/', (req, res) =>{
    Category.find((err, docs) =>{
        if(!err){
            res.send(docs);
        }
    });
 });
 
 router.post('/category/add/', (req, res)=>{
     var category = new Category();
     category.category = req.body.formdata.category;
     category.created_at = Date.now();
     category.save((err, docs) =>{
         if (err) {
             console.log('Error during record insertion : ' + err);
         } else {
           //  console.log(docs);
             res.send("success");
         } 
     });
 });
 
 router.post('/category/update', (req, res) =>{
    Category.findByIdAndUpdate({_id : req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs) =>{
         if (err) {
             console.log('Error during record updation : ' + err);
         } else {
            // console.log(docs);
             res.send("success");
         } 
     });
 });
 
 router.post('/category/delete/', (req, res) =>{
    Category.findByIdAndRemove(req.body.data, (err, docs)=>{
         if (err) {
             console.log('Error during record deletion : ' + err);
         } else {
            // console.log(docs);
             res.send("success");
         } 
     });
 });
 

 
//Sub-Category Name
router.get('/subcategory/select/', (req, res) =>{
    Subcategory.aggregate([
                { 
                    $lookup: {
                        from: 'categories',
                        localField: 'category_id',
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
 

 router.post('/subcategory/add/', (req, res)=>{
     var subcategory = new Subcategory();
     subcategory.category_id = req.body.formdata.category;
     subcategory.subcategory = req.body.formdata.subcategory;
     subcategory.created_at = Date.now();
     subcategory.save((err, docs) =>{
         if (err) {
             console.log('Error during record insertion : ' + err);
         } else {
             res.send('success');
         } 
     });
 });
 
 router.post('/subcategory/update', (req, res) =>{
    Subcategory.findByIdAndUpdate({_id : req.body.formdata.uniqueid}, req.body.formdata, {new : true}, (err, docs) =>{
         if (err) {
             console.log('Error during record updation : ' + err);
         } else {
            // console.log(docs);
             res.send("success");
         } 
     });
 });
 
 router.post('/subcategory/delete/', (req, res) =>{
    Subcategory.findByIdAndRemove(req.body.data, (err, docs)=>{
         if (err) {
             console.log('Error during record deletion : ' + err);
         } else {
            // console.log(docs);
             res.send("success");
         } 
     });
 });

 router.get('/tabledetails/select', (req, res) =>{
     ProductDetails.aggregate([
         {
             $lookup :{
                 from : 'categories',
                 localField : 'category_id',
                 foreignField : '_id',
                 as : 'category'
             }
         },
         {
            $lookup :{
                from : 'subcategories',
                localField : 'subcategory_id',
                foreignField : '_id',
                as : 'subcategory'
            }
        },
     ]).exec(function(err, docs){
         if(!err){
             res.send(docs);
         } else {
             res.send(err);
         }
     })
 })

 router.post('/clothdetails/add', upload.uploadproduct, function (req, res, next) {
    var productdetails = new ProductDetails();
    productdetails.category_id = req.body.category;
    productdetails.subcategory_id = req.body.subcategory;
    productdetails.modelname = req.body.model;
    productdetails.hsncode = req.body.hsncode;
    productdetails.unitprice = req.body.price;
    productdetails.sgst = req.body.sgst;
    productdetails.cgst = req.body.cgst;
    productdetails.offer = req.body.offer;
    productdetails.finalprice = req.body.finalprice;
    productdetails.sgstamount = req.body.sgsthiddenamt;
    productdetails.cgstamount = req.body.cgsthiddenamt;
    productdetails.offeramount = req.body.offerhiddenamt;
    productdetails.totaltax = req.body.finaltaxhiddenamt;
    productdetails.product_type = req.body.producttype;
    productdetails.size = req.body.size;
    productdetails.color = req.body.color;
    productdetails.specification = req.body.spec;
    productdetails.features = req.body.features;
    
    if(!req.files['mainimage'])
    productdetails.mainimage ="";
    else
    productdetails.mainimage = req.files['mainimage'][0]['filename'];

    if(!req.files['secondimage'])
    productdetails.secondimage ="";
    else
    productdetails.secondimage = req.files['secondimage'][0]['filename'];
    
    if(!req.files['thirdimage'])
    productdetails.thirdimage = "";
    else
    productdetails.thirdimage = req.files['thirdimage'][0]['filename'];

    if(!req.files['fourthimage'])
    productdetails.fourthimage = "";
    else
    productdetails.fourthimage = req.files['fourthimage'][0]['filename'];

    if(!req.files['fifthimage'])
    productdetails.fifthimage = "";
    else
    productdetails.fifthimage = req.files['fifthimage'][0]['filename'];

    productdetails.created_at = Date.now();

    productdetails.save((err, docs) => {
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(docs);
            res.send(docs);
        } 
    })
 });

 router.post('/tabledetails/delete', (req, res) =>{
     ProductDetails.findByIdAndRemove(req,body.data, (err, docs) =>{
         if(!err){
             console.log(docs)
         } else {
             console.log(err);
         }
     });
 });

 router.post('/product/view', (req, res) =>{
     ProductDetails.find({"_id" : req.body.formdatas.id}, (err, docs) =>{
         if(!err) {
            //  var formdata = [];
            // let sub_id;
            // let cat_id;
            // Object.keys(docs).forEach(key =>{
            //     sub_id=docs[key].subcategory_id;
            //     cat_id=docs[key].category_id;
            //     formdata.push(docs[key]);
            // });
            // Subcategory.find({"_id" : sub_id}, (error, result) =>{
            //     if(!error){
            //         Object.keys(result).forEach(key =>{
            //             formdata.push(result[key]);
            //         });
            //         Category.find({"_id" : cat_id}, (eror, ret) =>{
            //             if(!eror){
            //                 Object.keys(ret).forEach(key =>{
            //                     formdata.push(ret[key]);
            //                 });
            //                 res.send(formdata);
            //             }
            //         });
            //     }
            // });
            res.send(docs);
         }
     });
 });

 router.post('/clothdetails/update/', upload.uploadproduct, function (req, res, next) {
   let form_data = {};
   form_data.category_id=req.body.category;
   form_data.subcategory_id= req.body.subcategory;
   form_data.modelname= req.body.model;
   form_data.hsncode= req.body.hsncode;
   form_data.unitprice= req.body.price;
   form_data.sgst= req.body.sgst;
   form_data.cgst= req.body.cgst;
   form_data.offer= req.body.offer;
   form_data.finalprice= req.body.finalprice;
   form_data.sgstamount= req.body.sgsthiddenamt;
   form_data.cgstamount= req.body.cgsthiddenamt;
   form_data.offeramount= req.body.offerhiddenamt;
   form_data.product_type= req.body.producttype;
   form_data.totaltax= req.body.finaltaxhiddenamt;
   form_data.size= req.body.size;
   form_data.color= req.body.color;

   if(!req.files['mainimage'])
   form_data.mainimage=""
    else
   form_data.mainimage= req.files['mainimage'][0]['filename'];

   if(!req.files['secondimage'])
   form_data.secondimage=""
   else
   form_data.secondimage= req.files['secondimage'][0]['filename'];

   if(!req.files['thirdimage'])
   form_data.thirdimage=""
   else
   form_data.thirdimage= req.files['thirdimage'][0]['filename'];

   if(!req.files['fourthimage'])
   form_data.fourthimage=""
   else
   form_data.fourthimage= req.files['fourthimage'][0]['filename'];

   if(!req.files['fifthimage'])
   form_data.fifthimage=""
   else
   form_data.fifthimage= req.files['fifthimage'][0]['filename'];
   
   form_data.spec= req.body.spec;
   form_data.features= req.body.features;
   form_data.created_at=  Date.now();

     ProductDetails.findByIdAndUpdate({ _id : req.body.productid}, form_data, {new : true}, (err, docs) =>{
        if (err) {
            console.log('Error during record updation : ' + err);
        } else {
           // console.log(docs);
            res.send({success : 1});
        }
     })
 })


module.exports = router; 