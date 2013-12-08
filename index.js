

var fieldValidationCriteria = {
	title : {
		required : true,
		type : "string"
		minLength : 2,
		maxLength : 5
	},
	firstname : {
		required : true,
		type : "string",
		minLength : 1,
		maxLength : 100	
	},
	lastname : {
		required : true,
		type : "string",
		minLength : 2,
		maxLength : 100	
	},
	email : {
		required : true,
		type : "string",
		minLength : 5,
		maxLength : 100			
	},
	country : {
		required : true,
		type : "string",
		minLength : 2,
		maxLength : 3					
	},
	mailingList : {
		required : true,
		type : "boolean",
	},
	mobile : {
		type : "string",
		maxLength : 30	
	},
	addressLine1 : {
		type : "string",
		maxLength : 100			
	},
	addressLine2 : {
		type : "string",
		maxLength : 100					
	},
	city : {
		type : "string",
		maxLength : 50							
	}
};

var subsetFieldValidationCriteria = {
	title : {
		required : true,
		type : "string"
		minLength : 2,
		maxLength : 5
	},
	firstname : {
		required : true,
		type : "string",
		minLength : 1,
		maxLength : 100	
	},
	lastname : {
		required : true,
		type : "string",
		minLength : 2,
		maxLength : 100	
	},
	email : {
		required : true,
		type : "string",
		minLength : 5,
		maxLength : 100			
	},
	country : {
		required : true,
		type : "string",
		minLength : 2,
		maxLength : 3					
	},
	mailingList : {
		required : true,
		type : "boolean",
	}
};

