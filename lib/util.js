var _ = require("underscore");

var checkNotNull = function( item, msg ){
	if(_.isNull(item)){
		throw new Error(msg);
	}
};

var checkNotEmpty = function( item, msg ){
	checkNotNull( item, msg );

	if(_.isEmpty(item)){
		throw new Error(msg);
	}		
};

var checkIsObject = function( item, msg ){
	checkNotNull(item, msg);

	if(!_.isObject(item)){
		throw new Error(msg);
	}
};

var checkContainsKey = function( item, key, msg ){
	checkIsObject(item, msg);

	if( checkNotEmpty(item[key]) ){
		throw new Error(msg);
	}
};

var checkIsFunction = function( item, msg ){
	checkNotNull(item, msg);

	if(!_.isFunction(item)){
		throw new Error(msg);
	}
};

var createUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

var setId = function( item ){
	checkIsObject( item, "Must be of type object.");
	if(_.isNull(item.id)){
		item.id = createUUID();
	}
};

var executeSafely = function( callBack ){
	if(_.isFunction(callBack)){
		callBack();
	}
};

module.exports = {

	checkNotNull : checkNotNull,
	checkNotEmpty : checkNotEmpty,
	checkIsObject : checkIsObject,
	createUUID : createUUID,
	checkContainsKey : checkContainsKey, 
	setId : setId,
	executeSafely : executeSafely,
	checkIsFunction : checkIsFunction

};



