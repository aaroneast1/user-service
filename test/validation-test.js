var Validator = require("../lib/validation.js"),
	assert = require("assert"),
	_ = require("underscore"),
	should = require("should");



describe("Object field validation ", function(){

	before(function(){

	});


	describe("for type; number, string, boolean and string minimum, maximum length", function(){


		it("strict validation fails with fields not defined as part of validation", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "Aaron",
				lastname : "East"
			};

			var validationCriteria = {
				name : {
					type: "string", 
					required : true,
					minLength : 10,
					maxLength : 100
				}
			};

			var strictValidationOn = true;

			// act 
			var underTest = Validator.create(validationCriteria, strictValidationOn);
			var errors = underTest( itemToValidate );


			// assert
			errors.should.be.an.Array;
			errors.should.have.length(3);
			_.findWhere(errors, {key : 'firstname'}).should.include({key : 'firstname', errors : ['unknown']});
			_.findWhere(errors, {key : 'lastname'}).should.include({key : 'lastname', errors : ['unknown']});
			_.findWhere(errors, {key : 'name'}).should.include({key : 'name', errors : ['required', 'invalid_type_string', 'less_than_minimum_length']});

		});


		it("validation should fail when required fields are not present", function(){
			
			// arrange
			var itemToValidate = {};

			var validationCriteria = {
				name : {
					type: "string", 
					required : true,
				},
				mobile : {
					type : "string",
					required : true
				},
				age : {
					type : "number",
					required : true
				}
			};

			var strictValidationOn = true;


			// act 
			var underTest = Validator.create(validationCriteria, strictValidationOn);
			var errors = underTest( itemToValidate );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(3);
			_.findWhere(errors, {key : 'name'}).should.include({key : 'name', errors : ['required','invalid_type_string']});
			_.findWhere(errors, {key : 'mobile'}).should.include({key : 'mobile', errors : ['required','invalid_type_string']});
			_.findWhere(errors, {key : 'age'}).should.include({key : 'age', errors : ['required','invalid_type_number']});
		});


		it("successful validation no errors present", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "Aaron",
				lastname : "East",
				email : "test@test.com",
				age : 30,
				male : true,

			};

			var validationCriteria = {
				firstname : {
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				lastname : {
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				},
				email : {
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				age : {
					type : "number",
					required : true
				},
				male : {
					type : "boolean",
					required : true
				}
			};

			var strictValidationOn = true;


			// act 
			var underTest = Validator.create(validationCriteria, strictValidationOn);
			var errors = underTest( itemToValidate );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(0);
		});		


		it("unsuccessful validation type fails for number, string, boolean ", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "Aaron",
				lastname : "East",
				email : false,
				age : "Not a number",
				male : 1,
			};

			var validationCriteria = {
				firstname : {
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				lastname : {
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				},
				email : {
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				age : {
					type : "number",
					required : true
				},
				male : {
					type : "boolean",
					required : true
				}
			};

			var strictValidationOn = true;


			// act 
			var underTest = Validator.create(validationCriteria, strictValidationOn);
			var errors = underTest( itemToValidate );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(3);

			_.findWhere(errors, {key : 'email'}).should.include({key : 'email', errors : ['invalid_type_string', 'less_than_minimum_length']});
			_.findWhere(errors, {key : 'age'}).should.include({key : 'age', errors : ['invalid_type_number']});
			_.findWhere(errors, {key : 'male'}).should.include({key : 'male', errors : ['invalid_type_boolean']});

		});


		it("unsuccessful validation firstname too long, surname too short", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz123456789",
				lastname : "1"
			};

			var validationCriteria = {
				firstname : {
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				lastname : {
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				}
			};

			var strictValidationOn = false;


			// act 
			var underTest = Validator.create(validationCriteria, strictValidationOn);
			var errors = underTest( itemToValidate );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(2);

			_.findWhere(errors, {key : 'firstname'}).should.include({key : 'firstname', errors : ['greater_then_max_length']});
			_.findWhere(errors, {key : 'lastname'}).should.include({key : 'lastname', errors : ['less_than_minimum_length']});

		});		


	});


});