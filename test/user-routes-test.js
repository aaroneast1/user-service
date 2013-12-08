var assert = require("assert"),
	_ = require("underscore"),
	should = require("should"),
	superagent = require('superagent'),
	express = require('express'),
	router = require("../lib/user-routes.js");


describe("user service rest interface ", function(){

	var server;
	var underTest;
	var mockUserDb;
	var mockValidator;

	var validUser;
	var validInterested;

	before(function(){
	  mockUserDb = {};
	  
	  mockValidator = function(){
	  	return [];
	  };

	  var app = express();
	  server = app.listen(3000);  
	  app.use(express.bodyParser());

	  underTest = router.create(mockUserDb,app,mockValidator);

	  validUser = {
	    title : "Mr",
	    firstName : "Aaron",
	    lastName : "East",
	    email : "test@test.com",
	    country : "UK",
	    mailingList : true,
	    mobile : "07511111111",
	    addressLine1 : "10 Downing Street",
	    city : "London"
	  };

	  validInterested = {
		title : "Mr",
	    firstName : "Aaron",
	    lastName : "East",
	    email : "test@test.com",
	    country : "UK",
	    mailingList : true
	  };

	});

	after(function(){
		server.close();
	});

	

	var validationCriteria = [];

	it("Successfully retrieve a user by userId", function(done){

		var userId = "1";

		mockUserDb.getUserById = function(userId, callback){
			callback(null,_.extend(validUser, {id : userId}));
		}

		superagent.get('http://localhost:3000/user/'+userId)
			.end(function(e,res){
				should.strictEqual(null, e);
				should(res.body).have.property('title', "Mr");
				should(res.body).have.property('firstName', "Aaron");
				should(res.body).have.property('lastName', 'East');
				should(res.body).have.property('email', "test@test.com");
				should(res.body).have.property('country', "UK");
				should(res.body).have.property('mailingList', true);
				should(res.body).have.property('mobile', "07511111111");
				should(res.body).have.property('city', "London");	        
				done();
			});
	});

});
