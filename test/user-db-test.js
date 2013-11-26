
// dependencies

var assert = require("assert"),
	_ = require("underscore"),
	r = require("rethinkdb"),
	should = require("should"),
	Util = require("../lib/util.js");


// Helper functions (TODO : should move so is reusable for other tests)

var createDb = function( connection, dbName, callback ){
  r.dbCreate(dbName).run(connection, function(err, result) {
    if (err) throw err;
    connection.use(dbName);
    Util.executeSafely(callback);
  });
};

var createTable = function( connection, dbName, tableName, callback ){
	r.db(dbName).tableCreate(tableName).run(connection, function( err, result){
		if(err) throw err;
		callback();
	});
};

var dropDb = function( connection, dbName, callback ){
  r.dbDrop(dbName).run(connection, function(err, result) {
    if (err) throw err;
    Util.executeSafely(callback);
  });
};

// NOT USED
// var dropTables = function( connection, dbName ){
//   r.tableList().run(connection, function( err, tables ){
//     if (err) return err;
  
//     _.each(tables, function( t ){
//       r.db(dbName).tableDrop(t).run(connection, errorCallback);
//     });

//   });
// };

var dbSetup = function( connection, dbName, tableName, callback ){
  r.dbList().run(connection, function( err, dbs ){
    if(_.contains(dbs, dbName)){
        dropDb( connection, dbName );
    }
    createDb( connection, dbName, callback );
  });
};

var connection = null;
var dbName = "user_service_test";
var tableName = "user";
var userDb = null;


// Test suite start

describe("user-db.js tests", function(){

	

	before(function(done){
		this.timeout(5000);
		
		r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
		  if (err){
		  	throw new Error("Unable to connect to database. " + err.stack());
		  }
		  connection = conn;

		  dbSetup( connection, dbName, tableName, function(){
		  	createTable(connection, dbName, tableName, function(){
		  		userDb = require("../lib/user-db.js").createInstance(r,connection, dbName, tableName);
		  		done();
		  	});
		  });
		});
	});

	after(function(done){
		this.timeout(5000);
		dropDb(connection, dbName, done);		
	});


	describe("Retrieve, create, update and delete a single user", function( done ){

		var user1 = {
		    title : "Mr",
		    firstName : "Aaron",
		    lastName : "East",
		    email : "test@test.com",
		    country : "UK",
		    mailingList : true,
		    mobile : "07511111111",
		    addressLine1 : "10 Downing Street",
		    addressLine2 : "",
		    city : "London",
		    county : ""
		};

		before(function(done){
			r.db(dbName).table(tableName).delete().run(connection, function(err, result) {
				if (err) throw err;
				done();
			});
		});

		it("Successfully register a user",function( done ){

			userDb.registerUser( user1, function(err, result){
				
				if(err) throw err;

				should.exist(result.new_val.id);
				should(result.new_val).have.property( 'title', user1.title );
				should(result.new_val).have.property( 'firstName', user1.firstName );
				should(result.new_val).have.property( 'lastName', user1.lastName );
				should(result.new_val).have.property( 'email', user1.email );
				should(result.new_val).have.property( 'country', user1.country );
				should(result.new_val).have.property( 'mailingList', user1.mailingList );
				should(result.new_val).have.property( 'mobile', user1.mobile );
				should(result.new_val).have.property( 'addressLine1', user1.addressLine1 );
				should(result.new_val).have.property( 'addressLine2', user1.addressLine2 );
				should(result.new_val).have.property( 'city', user1.city );
				should(result.new_val).have.property( 'county', user1.county );
				done();

			});
		});


		it("Fail to register on empty user",function(){

			(function(){
			  userDb.registerUser( null );
			}).should.throwError("Cannot save an empty user.");

		});


		it("Fail to register on empty callback",function(){

			(function(){
			  userDb.registerUser( user1, null );
			}).should.throwError("Must supply a valid callback.");

		});


		it("Successfully retrieve a user by userId",function( done ){

			userDb.registerUser( user1, function(err, result){
				
				if(err) throw err;

				var userId = result.new_val.id;

				userDb.getUserById(userId, function(err, result){

					if(err) throw err;
					
					should(result).have.property( 'title', user1.title );
					should(result).have.property( 'firstName', user1.firstName );
					should(result).have.property( 'lastName', user1.lastName );
					should(result).have.property( 'email', user1.email );
					should(result).have.property( 'country', user1.country );
					should(result).have.property( 'mailingList', user1.mailingList );
					should(result).have.property( 'mobile', user1.mobile );
					should(result).have.property( 'addressLine1', user1.addressLine1 );
					should(result).have.property( 'addressLine2', user1.addressLine2 );
					should(result).have.property( 'city', user1.city );
					should(result).have.property( 'county', user1.county );
					done();
				});
			});
		});


		it("Fail to retrieve a user with an empty userId",function(){

			(function(){
			  userDb.getUserById( null );
			}).should.throwError("Cannot retrieve a user without a valid userId.");
		});


		it("Fail to register on empty callback",function(){

			(function(){
			  userDb.getUserById( "1", null );
			}).should.throwError("Must supply a valid callback.");
		});


		it("Successfully delete a user by userId",function( done ){

			userDb.registerUser( user1, function(err, result){
				if(err) throw err;

				var userId = result.new_val.id;

				userDb.deleteUser(userId, function(err, result){
					if(err) throw err;
					
					result.should.have.property('deleted',1);
					done();
				});
			});
		});


		it("Fail to delete a user with an empty userId",function(){

			(function(){
			  userDb.deleteUser( null );
			}).should.throwError("Cannot delete a user without a valid userId.");
		});


		it("Fail to delete on empty callback",function(){

			(function(){
			  userDb.deleteUser( "1", null );
			}).should.throwError("Must supply a valid callback.");
		});


		it("Successfully update a user by userId",function( done ){

			userDb.registerUser( user1, function(err, result){
				if(err) throw err;

				var id = result.new_val.id;
				var changes = {firstName : "changeFirstname", lastName : "changeLastname"};
				
				userDb.updateUser(id, changes, function(err, result){
					if(err) throw err;

					
					should(result.new_val).have.property( 'firstName', changes.firstName );
					should(result.new_val).have.property( 'lastName', changes.lastName );
					should(result.new_val).have.property( 'id', id);

					done();
				});
			});
		});


		it("Fail to update a user with an empty userId",function(){

			(function(){
			  userDb.updateUser( null );
			}).should.throwError("Cannot update a user without a valid userId.");
		});


		it("Fail to update on empty callback",function(){

			(function(){
			  userDb.updateUser( "1", null );
			}).should.throwError("Cannot update an empty user.");
		});


		it("Fail to update on empty callback",function(){

			(function(){
			  userDb.updateUser( "1", {}, null );
			}).should.throwError("Must supply a valid callback.");
		});


	});


});


