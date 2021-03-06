// Importing the modules we need
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressJWT=require('express-jwt')
var jwt=require('jsonwebtoken')

var regex = RegExp('get_seasons');


// Connecting to the DB
mongoose.connect('mongodb://localhost:27017/finalasess');
mongoose.Promise = global.Promise;


// Create Express application
var app = module.exports = express();
//ap1/app/get_items is for login
app.use(expressJWT({secret:'happy'}).unless({path:['/api/app/get_items','/api/app/get_seasons',regex,'/api/app/get_series','/api/app/get_users','/api/app/verification','/api/app/postsubuser','/api/app/post_season']}))
var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes = require('./routes/route')
app.use('/api', routes);

// Use environment defined port or 3000
var port = process.env.PORT || 2000;

// Start the server
app.listen(port);
console.log('Insert getat on port ' + port);
