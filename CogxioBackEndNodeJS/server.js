// server.js

// BASE SETUP
// =============================================================================
require('newrelic');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MeanData'); // connect to our database

var UserFeedData = require('./Model/FeedStatusData'); 
// call the packages we need
var express    = require('express')
  , path = require('path')
  , http = require('http')
  , reload = require('reload')
  , cors = require('cors')
  , jwt = require('express-jwt')
  , bodyParser = require('body-parser');		// call express
var app = express(); 	
var jwtCheck = jwt({
    secret: new Buffer('VVJmcbl20Ex8Xif6qkzCBL2idHVU6k4NQOO9PQ6pDSgmE-avuAF_y11RaBCws7d9', 'base64'),
    audience: 'hGjThwxsOXDlvjSVy0sK2BMP18ooD4Yq'
  });

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use('/api/postStatusData', jwtCheck);
app.use('/api/getAllUserStatusData', jwtCheck);
app.use(bodyParser());
app.use(cors());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

// app.use(function(err, req, res, next) {
  // if (err.name === 'StatusError') {
    // res.send(err.status, err.message);
  // } else {
    // next(err);
  // }
// });
//app.use(app.router); 
  // app.use(express.static(clientDir)); 

var port = process.env.PORT || 8085; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router
//app.use(express.favicon());
//   app.use(express.logger('dev'));
// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// app.get('/', function(req, res) {
  // res.sendfile(path.join(clientDir, 'HomePage.htm'))
// })

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/', function(req, res) {
//	res.json({ message: 'hooray! welcome to our api!' });	
//});

// more routes for our API will happen here

//for InputPage.html edited by Manish!!!!!!!!!!!!
//router.get('/InputPage', function(req, res) {

//res.send('InputPage.htm');
//});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

router.route('/postStatusData')

// create a userForm Model (accessed at POST http://localhost:8080/api/userForm)
	.post(function (req, res) {
      var userFeedData  = new UserFeedData(req.body);
      userFeedData.comments = req.body.comments;

    
     
	 
	  userFeedData.save(function (err) {

    console.log('Debugger save Method');
	    if (err) 
      {
	     res.send(err);
		 res.json({message:'Unable to creat Collection in MongoDB!!!(MKP)'});
         console.error('ERROR!:at Port:8085');
         console.log('Error log:at Port:8085');
      }else{
	    res.json({ message: 'userFeedData created!' });
      console.log('Console-log Info: Form submmited!!!');
     
      }
	  });

	}).get(function(req, res) {
		userFeedData.find(function(err, userFeedData) {
			if (err)
				res.send(err);

			res.json(userFeedData);
		});
	});
	//get all user Form Data!!!!
	router.route('/getAllUserStatusData')
	.get(function(req,res){
	userFeedData.find({},function(error,allUsers){
	if(error)
	res.send(error);
	res.json(allUsers);
	});
	});
	
router.route('/getAllUserStatusData/:user_id')

// get the userFeedData with that id (accessed at GET http://localhost:8080/api/userFeedData/:user_id)
	.get(function (req, res) {
	  userFeedData.findById(req.params.user_id, function (err, allUsers) {
	    if (err)
	      res.send(err);
	    res.json(allUsers);
	  });
	})// update the UserFeedData with this id (accessed at PUT http://localhost:8080/api/userFeedData/:user_id)
	.put(function (req, res) {

	  // use our UserFeedData model to find the UserFeedData we want
	  UserFeedData.findById(req.params.user_id, function (err, allUsers) {

	    if (err)
	      res.send(err);

	    UserFeedData.name = req.body.name; 	// update the UserFeedData info

	    // save the UserFeedData
	    UserFeedData.save(function (err) {
	      if (err)
		  {
	        res.send(err);
			console.error("unable to save data at Port:8085");
		  }else{
	      res.json({ message: 'UserFeedData updated!' });
      }	  
	  });

	  });
	}).delete(function(req, res) {
		UserFeedData.remove({
			_id: req.params.user_id
		}, function(err, allUsers) {
			if (err)
				res.send(err);
			res.json({ message: 'UserFeedData Successfully deleted' });
		});
	});

  


 app.use('/api', router);

// START THE SERVER


var server = http.createServer(app)

reload(server, app)

// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);