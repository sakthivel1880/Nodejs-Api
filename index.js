require('./model/db');

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require("path");

//Admin
const SiteDetails = require('./controller/SiteDetails');
const ManualEntries = require('./controller/ManualEnteries');
const ProductDetails = require('./controller/ProductDetails');
const Advertisment = require('./controller/Advertisment');
const Commonfile = require('./controller/Commonfile');

//Fronte End
const Main = require('./controller/frontend/Main');

var app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});

//Admin
app.use('/sitedetails', SiteDetails);
app.use('/manualentries', ManualEntries);
app.use('/productdetails', ProductDetails);
app.use('/advertisment', Advertisment);
app.use('/commonfiles', Commonfile);

//Front End
app.use('/front/api/v1', Main);