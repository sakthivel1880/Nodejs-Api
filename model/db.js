const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/ImproveDB";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (!err) { console.log("MongoDB Connection Succeeded"); } else {
        console.log("An Error Occured");
    }
})
require('./logo.model');
require('./social.model');
require('./aboutus.model');
require('./company.model');
require('./privacy.model');
require('./terms.model');
require('./shpping.model');
require('./units.model');
require('./tax.model');
require('./color.model');
require('./category.model');
require('./subcategory.model');
require('./banner.model');
require('./common.model');
require('./special.model');
require('./productdetails.model');
require('./register.model');
require('./message.model');
require('./subscribe.model');
require('./cart.model');
require('./whishlist.model');
require('./profile.model');