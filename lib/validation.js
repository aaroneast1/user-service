var _ = require("underscore");


var typePredictates = {
	string : _.isString,
	number : _.isNumber,
	boolean : _.isBoolean
}


module.exports.validate = function( itemToValidate, fields, strict ){
	var validationArr = _.map(_.keys(itemToValidate), function(key){
		return {
			key : key,
			errors : []
		}
	});

	if(strict){
		var unkownKeyArr = _.difference(_.difference(_.keys(itemToValidate), _.pluck(fields, 'key')));

		_.each(unkownKeyArr,function( key ){
			validationArr.push( { key : key, errors : ["unknown"] } );
		});
	}

	// required fields
	var requireFields = _.difference(_.pluck(_.filter(fields, function( field ){
		return field.required;
	}), 'key'), _.keys(itemToValidate));

	_.each(requireFields, function(requiredKey){
		validationArr.push( { key : requiredKey, errors : ["required"] } )
	});


	// type validation
	_.each(fields, function( field ){
		var fieldValue = itemToValidate[field.key];
		if(!_.isNull(fieldValue) && !_.isUndefined(fieldValue)){
			var type = _.findWhere(fields, {key : field.key}).type;
			if(!typePredictates[type](fieldValue)){
				var validation = _.findWhere(validationArr, {key : field.key});
				if(_.isNull(validation)){
					validationArr.push( { key : field.key, errors : ["not_"+type] } );
				}else{
					_.findWhere(validationArr, {key : field.key}).errors.push("not_"+type);
				}
			}
		}
	});

	// min length


	// max length

	return _.filter(validationArr, function(item){ return item.errors.length > 0});

}; 

