const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//Model
const Product = mongoose.model('productdetails');
const Category = mongoose.model('category');
const Subcategory = mongoose.model('subcategory');
const Cart = mongoose.model('cart');
const Whishlist = mongoose.model('whishlist');

const autocomplete = async(req, res) => {
    try {
        await Product.find({}, { modelname: 1, category_id: 1, subcategory_id: 1 }, (err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(docs);
        });

    } catch {
        throw Error("Error Bad Request.");
    }
}

const categories = async(req, res) => {
    try {
        await Category.find((err, doc) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(doc);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const subcategories = async(req, res) => {
    try {
        await Subcategory.find({ category_id: { $in: ["5f3bf35517bba5eeca778a95", "5ebf85fd5329d328ac47af21"] } }, (err, doc) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(doc);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const productdetails = async(req, res) => {
    try {
        await Product.aggregate([{
            $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category'
            }
        }, {
            $lookup: {
                from: 'subcategories',
                localField: 'subcategory_id',
                foreignField: '_id',
                as: 'subcategory'
            }

        }, { $limit: 30 }]).exec(function(err, docs) {
            if (!err) {
                res.send(docs);
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const productdetailswithid = async(req, res) => {
    try {
        await Product.find({ subcategory_id: req.body.id }, (err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(docs);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const singleproduct = async(req, res) => {
    try {
        await Product.find({ _id: req.body.id }, (err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(docs);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const productdetailswithcategory = async(req, res) => {
    try {
        await Product.find({ category_id: req.body.id }, (err, docs) => {
            if (err)
                console.log("Error data selection" + err);
            else
                res.send(docs);
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const addtocart = async(req, res) => {
    try {
        await Cart.find({ user_id: req.body.user, product_id: req.body.product }, (errval, docsval) => {
            if (docsval.length == 0) {
                var cart = new Cart();
                cart.user_id = req.body.user;
                cart.product_id = req.body.product;
                cart.quantity = 1;
                cart.status = 1;
                cart.created_at = Date.now();
                cart.save((err, docs) => {
                    if (err)
                        console.log("Error data selection" + err);
                    else
                        res.send({ success: 1 });
                })
            } else {
                res.send({ success: 0 });
            }
        })

    } catch {
        throw Error("Error Bad Request.");
    }
}


const addtowhishlist = async(req, res) => {
    try {
        await Whishlist.find({ user_id: req.body.user, product_id: req.body.product }, (errval, docsval) => {
            if (docsval.length == 0) {
                var whishlist = new Whishlist();
                whishlist.user_id = req.body.user;
                whishlist.product_id = req.body.product;
                whishlist.created_at = Date.now();
                whishlist.save((err, docs) => {
                    if (err)
                        console.log("Error data selection" + err);
                    else
                        res.send({ success: 1 });
                })
            } else {
                res.send({ success: 0 });
            }
        })

    } catch {
        throw Error("Error Bad Request.");
    }
}

const newarrivals = async(req, res) => {
    try {

        await Product.find({}, null, { sort: { created_at: -1 }, limit: 30 }, function(err, docs) {
            if (!err) {
                res.send(docs);
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}



const whishlist = async(req, res) => {
    try {
        await Whishlist.find({ user_id: req.body.user }).populate("product_id").exec((err, docs) => {
            if (!err) {
                (docs != "" ? res.send(docs) : res.send({ success: 0 }));
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

const removewhishlist = async(req, res) => {
    try {
        await Whishlist.findByIdAndRemove(req.body.val, (err, docs) => {
            if (!err) {
                res.send({ success: 1 })
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const cartlist = async(req, res) => {
    try {
        await Cart.find({ user_id: req.body.user }).populate("product_id").exec((err, docs) => {
            if (!err) {
                (docs != "" ? res.send(docs) : res.send({ success: 0 }));
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const quantitycartlist = async(req, res) => {
    try {
        await Cart.findByIdAndUpdate({ _id: req.body.id }, { quantity: req.body.quantity }, (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}


const removecartlist = async(req, res) => {
    try {
        await Cart.findByIdAndRemove(req.body.id, (err, docs) => {
            if (!err) {
                res.send({ success: 1 })
            } else {
                res.send(err);
            }
        })
    } catch {
        throw Error("Error Bad Request.");
    }
}

module.exports = {
    autocomplete,
    categories,
    subcategories,
    productdetails,
    productdetailswithid,
    singleproduct,
    newarrivals,
    productdetailswithcategory,
    addtocart,
    addtowhishlist,
    whishlist,
    removewhishlist,
    cartlist,
    quantitycartlist,
    removecartlist
}