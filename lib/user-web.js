var _ = require("underscore");
var Util = require("../lib/util.js");

// For moment harding coding mandatory fields
var mandatoryUserFields = [
	"title",
	"firstName",
	"lastName",
	"email",
	"country",
	"mailingList",
	"mobile",
	"addressLine1",
	"addressLine2",
	"city"
];

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