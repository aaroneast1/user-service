var underTest = require("../lib/validation.js"),
	assert = require("assert"),
	_ = require("underscore"),
	should = require("should"),
	Util = require("../lib/util.js");



describe("Object field validation ", function(){


	describe("for type; number, string, boolean and string minimum, maximum length", function(){


		it("strict validation fails with fields not defined as part of validation", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "Aaron",
				lastname : "East"
			};

			var fields = [
				{
					key : 'email',
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				{
					key : 'mobile',
					type : "string",
					required : true
				},
				{
					key : 'age',
					type : "number",
					required : true
				}
			];


			// act 
			var errors = underTest.validate( itemToValidate, fields, true );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(5);
			_.findWhere(errors, {key : 'firstname'}).should.include({key : 'firstname', errors : ['unknown']});
			_.findWhere(errors, {key : 'lastname'}).should.include({key : 'lastname', errors : ['unknown']});
		});


		it("validation should fail when required fields are not present", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "Aaron",
				lastname : "East"
			};

			var fields = [
				{
					key : 'email',
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				{
					key : 'mobile',
					type : "string",
					required : true
				},
				{
					key : 'age',
					type : "number",
					required : true
				}
			];


			// act 
			var errors = underTest.validate( itemToValidate, fields, true );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(5);
			_.findWhere(errors, {key : 'firstname'}).should.include({key : 'firstname', errors : ['unknown']});
			_.findWhere(errors, {key : 'lastname'}).should.include({key : 'lastname', errors : ['unknown']});
			_.findWhere(errors, {key : 'email'}).should.include({key : 'email', errors : ['required']});
			_.findWhere(errors, {key : 'mobile'}).should.include({key : 'mobile', errors : ['required']});
			_.findWhere(errors, {key : 'age'}).should.include({key : 'age', errors : ['required']});
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

			var fields = [
				{
					key : 'firstname',
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				{
					key : 'lastname',
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				},
				{
					key : 'email',
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				{
					key : 'age',
					type : "number",
					required : true
				},
				{
					key : 'male',
					type : "boolean",
					required : true
				}
			];


			// act 
			var errors = underTest.validate( itemToValidate, fields, true );

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

			var fields = [
				{
					key : 'firstname',
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				{
					key : 'lastname',
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				},
				{
					key : 'email',
					type: "string", 
					required : true,
					minLength : 5,
					maxLength : 200
				},
				{
					key : 'age',
					type : "number",
					required : true
				},
				{
					key : 'male',
					type : "boolean",
					required : true
				}
			];


			// act 
			var errors = underTest.validate( itemToValidate, fields, true );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(3);

			_.findWhere(errors, {key : 'email'}).should.include({key : 'email', errors : ['not_string']});
			_.findWhere(errors, {key : 'age'}).should.include({key : 'age', errors : ['not_number']});
			_.findWhere(errors, {key : 'male'}).should.include({key : 'male', errors : ['not_boolean']});

		});


		xit("unsuccessful validation firstname too long, surname too short", function(){
			
			// arrange
			var itemToValidate = {
				firstname : "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz123456789",
				lastname : "1"
			};

			var fields = [
				{
					key : 'firstname',
					type: "string", 
					required : true,
					minLength : 1,
					maxLength : 50
				},
				{
					key : 'lastname',
					type: "string", 
					required : true,
					minLength : 2,
					maxLength : 50
				}
			];


			// act 
			var errors = underTest.validate( itemToValidate, fields, true );

			// assert
			errors.should.be.an.Array;
			errors.should.have.length(2);

			_.findWhere(errors, {key : 'firstname'}).should.include({key : 'firstname', errors : ['not_max_length']});
			_.findWhere(errors, {key : 'lastname'}).should.include({key : 'lastname', errors : ['not_min_length']});

		});		


	});


});