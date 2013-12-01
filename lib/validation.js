var _ = require("underscore");

var typePredictates = {
	string : _.isString,
	number : _.isNumber,
	boolean : _.isBoolean
};

function checkObject( object, message ){
	if(!_.isObject( object )){
		throw new Error(message);
	}
};

function exists( item ){
	return !_.isUndefined( item ) && !_.isNull( item );
}

var isTrue = _.memoize(function( item ){
	return !_.isUndefined(item) || !_.isNull( item ) || item !== false;
});


// Validation predicates
var requiredPredicate = function( fieldCriteria, value ){
	return fieldCriteria.required && !exists(value); 
};


var validator = function( fieldCriteria, fieldValue, strict ){
	var errors = [];
	if(_.isObject(fieldCriteria)){

		if( requiredPredicate(fieldCriteria,fieldValue) ){
			errors.push("required");
		}

		var type = fieldCriteria.type;

		if(exists(type) && !typePredictates[type.toLowerCase()](fieldValue)){
			errors.push("invalid_type_"+type.toLowerCase());
		}


		if(type === "string"){
			var minLength = fieldCriteria.minLength;

			if(exists(minLength)){
				if(_.isEmpty(fieldValue) || fieldValue.length <= minLength){
					errors.push("less_than_minimum_length");
				}
			}

			var maxLength = fieldCriteria.maxLength;	

			if(exists(maxLength)){
				if(exists(fieldValue) && fieldValue.length > maxLength){
					errors.push("greater_then_max_length");
				}
			}	
		}

	}else{
		if(isTrue( strict )){
			errors.push("unknown");
		}
	}

	return errors;
}

module.exports.validate = function( itemToValidate, criteria, strict ){
	checkObject(itemToValidate, "Object to validate is not an object.");
	checkObject(criteria, "Validation criteria have not been provided.");

	var itemValidationArr = _.map(_.pairs( itemToValidate ), function( pair ){
		var key = pair[0];
		var fieldValue = pair[1];

		return {
			key : key,
			errors : validator( criteria[key], fieldValue, strict )
		}
	});

	var itemKeys = _.keys(itemToValidate);
	var validationKeys = _.keys(criteria);

	var remainingKeys = _.difference(validationKeys,itemKeys);

	_.each(remainingKeys, function(remaingKey){

		var fieldCriteria = criteria[remaingKey];
		if( requiredPredicate(fieldCriteria,undefined) ){
			itemValidationArr.push({
				key : remaingKey,
				errors : validator(fieldCriteria, undefined, strict) 
			});
		}
	});

	return _.reject(itemValidationArr, function(item){
		return item.errors == 0;
	});

}; 

