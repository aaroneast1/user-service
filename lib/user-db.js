var _ = require("underscore");
var Util = require("../lib/util.js");


// Constructor
var User = function( rethinkdb, connection, dbName, tableName ){
	Util.checkNotNull(rethinkdb, "Must supply a valid db instance.");
	Util.checkNotNull(connection, "Must supply a valid db instance.");
	Util.checkNotEmpty(dbName, "Must supply a valid dbName.");
	Util.checkNotEmpty(tableName, "Must supply a valid tableName.");

	this.rethinkdb = rethinkdb;
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
	Util.checkNotEmpty( id, "Cannot update a user without an id" );
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
	Util.checkNotEmpty( id, "Must supply a valid id.");
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
	Util.checkNotEmpty( id, "Must supply a valid id.");
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

