var _ = require("underscore");
var Util = require("../lib/util.js");

var internal = {};

function UserRoutes( userDb, server, validator, internal ){
	Util.checkIsObject( userDb, "No userDb provided." );
	Util.checkIsObject( server, "No express provided." );
	Util.checkIsFunction( validator, "No validation provided." );

	internal.userDb = userDb;
	internal.server = server;
	internal.validator = validator;
	this.internal = internal;
	internal.init();
};

internal.init = function(){
	internal.initGetUserId();
}


internal.initGetUserId = function(){
	this.server.get('/user/:id', function(request,response){

		// db
		internal.userDb.getUserById(request.id, function(e,res){

			if(e){
				// todo - how do you set http error code
				throw e;
			}

			response.send(res);
		});
		
	});
}

module.exports.create = function(userDb, server, validator){
	return new UserRoutes(userDb, server, validator, internal);
};