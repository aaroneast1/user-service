var _ = require("underscore");
var Util = require("../lib/util.js");

// For moment harding coding mandatory fields
var mandatoryUserFields = {
	"title" : String,
	"firstName" : String,
	"lastName" : String,
	"email" : String,
	"country" : String,
	"mailingList" : Boolean,
	"mobile" : String,
	"addressLine1" : String,
	"addressLine2" : String,
	"city" : String
};

var mandatoryUserInterestFields = [
	"title",
	"firstName",
	"lastName",
	"email",
	"country",
	"mailingList"
];

var validateUser = function( user, mandatoryFields ){
	var submittedKeys = _.keys(user);
	var matchedKeys = _.intersection(mandatoryFields,submittedKeys);
	return _.difference(mandatoryFields,matchedKeys);
};