var _ = require("underscore"),
	Util = require("../lib/util.js");

// TODO - implement connection etc in user-db.js
//rethinkdb = require("rethinkdb");

// var optionals = {
// 	host : "localhost",
// 	port : 28015,
// 	dbName : "test",
// 	tableName : "user"
// }

// var initializeOptions = function( options ){
// 	if(!_.isNull(options) && _.isObject(options)){
// 		optionaoptions.dbName == undefined ? optionals.dbName : 
// 	}

// 	return optionals;
// }

// Constructor
var User = function( r, connection, dbName, tableName ){
	Util.checkIsObject(r, "Must supply a valid rethinkdb driver.");
	Util.checkIsObject(connection, "Must supply a valid connection.");
	Util.checkNotEmpty(dbName, "Must supply a valid dbName.");
	Util.checkNotEmpty(tableName, "Must supply a valid tableName.");

	// TODO - implement connection etc in user-db.js
	// r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
	//   if (err){
	//   	throw new Error("Unable to connect to database. " + err.stack());
	//   }
	//   connection = conn;

	//   dbSetup( connection, dbName, tableName, function(){
	//   	createTable(connection, dbName, tableName, function(){
	//   		userDb = require("../lib/user-db.js").createInstance(r,connection, dbName, tableName);
	//   		done();
	//   	});
	//   });
	// });

	this.rethinkdb = r;
	this.connection = connection;
	this.dbName = dbName;
	this.tableName = tableName;
};

User.prototype.registerUser = function( user, callBack, options ){
	Util.checkIsObject( user, "Cannot save an empty user." );
	Util.checkIsFunction( callBack, "Must supply a valid callback.");

	var optionals = options == undefined ? {upsert: true, return_vals: true} : options;
	Util.setId( user );

	this.rethinkdb
		.db(this.dbName)
		.table(this.tableName)
		.insert( user, optionals )
		.run(this.connection, function(err, result){
			callBack(err, result);
    	});
};

User.prototype.updateUser = function( id, changes, callBack, options ){
	Util.checkNotEmpty( id, "Cannot update a user without a valid userId." );
	Util.checkIsObject( changes, "Cannot update an empty user." );
	Util.checkIsFunction( callBack, "Must supply a valid callback." );

	var optionals = options != null ? options : {return_vals : true};

	this.rethinkdb
		.db(this.dbName)
		.table(this.tableName)
		.get( id )
		.update( changes, optionals )
		.run(this.connection, function(err, result){
			callBack(err, result);
    	});
};

User.prototype.getUserById = function( id, callBack ){
	Util.checkNotEmpty( id, "Cannot retrieve a user without a valid userId.");
	Util.checkIsFunction( callBack, "Must supply a valid callback.");

	this.rethinkdb
		.db(this.dbName)
		.table(this.tableName)
		.get( id )
		.run(this.connection, function(err, result){
			callBack(err, result);
    	});
};

User.prototype.deleteUser = function( id, callBack ){
	Util.checkNotEmpty( id, "Cannot delete a user without a valid userId.");
	Util.checkIsFunction( callBack, "Must supply a valid callback.");

	this.rethinkdb
		.db(this.dbName)
		.table(this.tableName)
		.get( id )
		.delete({durability: 'hard'})
		.run(this.connection, function(err, result){
			callBack(err, result);
    	});
};


module.exports.createInstance = function( r, connection, dbName, tableName ){
	return new User( r, connection, dbName, tableName );
};

