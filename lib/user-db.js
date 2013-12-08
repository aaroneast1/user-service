var _ = require("underscore"),
	Util = require("../lib/util.js"),
	rethinkdb = require("rethinkdb");


var defaultOptions = {
	host : "localhost",
	port : 28015,
	dbName : "test",
	tableName : "user"
}

var initializeOptions = function( options ){
	if(!_.isNull(options) && _.isObject(options)){
		return _.extend(defaultOptions, options);
	}

	return defaultOptions;
}


// Constructor
var User = function( options, callback ){
	var self = this;
	var optionals = initializeOptions( options );

	// TODO - implement connection etc in user-db.js
	rethinkdb.connect( {host : optionals.host, port : optionals.port}, function(err, conn) {
		if (err){
			throw new Error("Unable to connect to database. " + err.stack());
		}

		self.connection = conn;
		self.dbName = optionals.dbName;
		self.tableName = optionals.tableName;

		Util.executeSafely(callback);
	});
};

User.prototype.registerUser = function( user, callBack, options ){
	Util.checkIsObject( user, "Cannot save an empty user." );
	Util.checkIsFunction( callBack, "Must supply a valid callback.");

	var optionals = options == undefined ? {upsert: true, return_vals: true} : options;
	Util.setId( user );

	rethinkdb
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

	rethinkdb
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

	rethinkdb
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

	rethinkdb
		.db(this.dbName)
		.table(this.tableName)
		.get( id )
		.delete({durability: 'hard'})
		.run(this.connection, function(err, result){
			callBack(err, result);
    	});
};


module.exports.createInstance = function( options, callback ){
	return new User( options, callback );
};

