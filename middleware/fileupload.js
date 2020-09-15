const path = require("path");
var multer  = require('multer');

//File Upload For Logo Favicon
var storagelogo = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const uploadlogo = multer({
    storage: storagelogo
  }).fields([{name: "logo", maxCount: 1}, {name: "favicon", maxCount: 1}]);

  
//File Upload For Advertisment 
var storagead = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/advertisment/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const uploadad = multer({
    storage: storagead
  }).fields([{name: "image", maxCount: 1}]);


  
//File Upload For Product
var storageproduct = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/productimages/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const uploadproduct = multer({
    storage: storageproduct
  }).fields([{name: "mainimage", maxCount: 1}, {name: "secondimage", maxCount: 1}
  , {name: "thirdimage", maxCount: 1}, {name: "fourthimage", maxCount: 1}, {name: "fifthimage", maxCount: 1}]);


  module.exports = {
    uploadlogo,
    uploadad,
    uploadproduct
  }