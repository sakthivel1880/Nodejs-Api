const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const upload = require('../middleware/fileupload');

//Models
const Logo = mongoose.model('logo');
const Social = mongoose.model('socialmedia');
const About = mongoose.model('aboutu');
const Company = mongoose.model('company');
const Privacy = mongoose.model('privacy');
const Terms = mongoose.model('term');
const Shipping = mongoose.model('shipping');

//Unique Generation
var uuid = require('uuid');



  //Social Media's
router.get('/socialmedia/select',(req,res) => {
    Social.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});

router.post('/socialmedia/add', (req, res) => {
    var socialmedia = new Social();
    console.log(socialmedia);
    // socialmedia.social_id = uuid.v1();
    socialmedia.phone = req.body.formdata.phone;
    socialmedia.facebook = req.body.formdata.facebook;
    socialmedia.twitter = req.body.formdata.twitter;
    socialmedia.instagram = req.body.formdata.instagram;
    socialmedia.linkedin = req.body.formdata.linkedin;
    socialmedia.created_at = Date.now();
    socialmedia.save((err, doc) => {
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        }
    });

});

router.post('/socialmedia/update',(req,res) => { 
    Social.findByIdAndUpdate({_id:req.body.formdata.uniqueid},req.body.formdata,{new:true},(err,doc)=>{
        if (err) {
            console.log('Error during record updation : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        }
    });
});

router.post('/socialmedia/delete/',(req,res) => { 
    Social.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }

    });
});


//Aboutus
router.get('/aboutus/select',(req,res) => {
    About.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});


router.post('/aboutus/add/',(req,res) => {
    var Aboutus = new About();
    Aboutus.aboutus = req.body.formdata.aboutus;
    Aboutus.created_at = Date.now();
    Aboutus.save((err, doc) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        } 
    })
});

router.post('/aboutus/delete/',(req, res) =>{
    About.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }        
    })
});


//Logo Favicon
router.get('/logo/select',(req,res) => {
    Logo.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});


router.post("/logo/add/", upload.uploadlogo, function (req, res, next) {
    var logo = new Logo();
    logo.title = req.body.title;
    logo.logo = req.files['logo'][0]['filename'];
    logo.favicon = req.files['favicon'][0]['filename'];
    logo.save((err, doc)=>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send({
                logo : req.files['logo'][0]['filename'],
                favicon: req.files['favicon'][0]['filename'],
                title : req.body.title
            });
        } 
    })
  });

  router.post('/logo/delete/',(req, res) =>{
    Logo.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }        
    })
});


//Company Details

router.get('/company/select',(req, res)=>{
    Company.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }
    });
});

router.post('/company/add',(req, res)=>{
    var company = new Company();
    company.phone = req.body.phone;
    company.name = req.body.name;
    company.email = req.body.email;
    company.address = req.body.address;
    company.created_at = Date.now();
    company.save((err, doc) => {
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        }
    });
});

router.post('/company/update',(req, res)=>{
    Company.findByIdAndUpdate({_id:req.body.formdata.uniqueid},req.body.formdata,{new:true},(err, docs) =>{
        if (err) {
            console.log('Error during record updation : ' + err);
        } else {
            console.log(docs);
            res.send("success");
        }
    });
});

router.post('/company/delete',(req, res)=>{
    Company.findByIdAndDelete(req.body.data,(err, docs)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(docs);
            res.send("success");
        }    
});
});


//Privacy Policy
router.get('/privacy/select',(req,res) => {
    Privacy.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});


router.post('/privacy/add/',(req,res) => {
    var privacy = new Privacy();
    privacy.privacy = req.body.formdata.privacy;
    privacy.created_at = Date.now();
    privacy.save((err, doc) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        } 
    })
});

router.post('/privacy/delete/',(req, res) =>{
    Privacy.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }        
    })
});



//Terms & Condition
router.get('/terms/select',(req,res) => {
    Terms.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});


router.post('/terms/add/',(req,res) => {
    var term = new Terms();
    term.terms = req.body.formdata.terms;
    term.created_at = Date.now();
    term.save((err, doc) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        } 
    })
});

router.post('/terms/delete/',(req, res) =>{
    Terms.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }        
    })
});


//Shipping Delivery
router.get('/shipping/select',(req,res) => {
    Shipping.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }

    });
});


router.post('/shipping/add/',(req,res) => {
    var shipping = new Shipping();
    shipping.shipping = req.body.formdata.shipping;
    shipping.created_at = Date.now();
    shipping.save((err, doc) =>{
        if (err) {
            console.log('Error during record insertion : ' + err);
        } else {
            console.log(doc);
            res.send("success");
        } 
    })
});

router.post('/shipping/delete/',(req, res) =>{
    Shipping.findByIdAndRemove(req.body.data,(err, doc)=>{
        if (err) {
            console.log('Error during record deletion : ' + err);
        } else {
            // console.log(doc);
            res.send("success");
        }        
    })
});



module.exports = router;