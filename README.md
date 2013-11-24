user-service
============

User service allows you to register a user, register interest, update, delete and retrieve users

```javascript

GET 
/user-service/68e48970-54f7-11e3-8f96-0800200c9a66

RESPONSE 200
{
	id : "68e48970-54f7-11e3-8f96-0800200c9a66",
	title : "Mr",
	firstName : "Aaron",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
	mobile : "07511111111",
	addressLine1 : "10 Downing Street",
	addressLine2 : "",
	city : "London",
	county : ""
}

```

```javascript

GET 
/user-service

RESPONSE 200
[
	{
		id : "68e48970-54f7-11e3-8f96-0800200c9a66",
		title : "Mr",
		firstName : "Aaron",
		lastName : "East",
		email : "test@test.com",
		country : "UK",
		mailingList : true
		mobile : "07511111111",
		addressLine1 : "10 Downing Street",
		addressLine2 : "",
		city : "London",
		county : ""
	},
	{
		id : "68e48970-54f7-11e3-8f96-0800200c9a66",
		title : "Miss",
		firstName : "Yulia",
		lastName : "East",
		email : "test@test1.com",
		country : "UK",
		mailingList : true
		mobile : "07511111111",
		addressLine1 : "10 Downing Street",
		addressLine2 : "",
		city : "London",
		county : ""
	}

]

```


```javascript

GET 
/user-service?name=East

RESPONSE 200
[
	{
		id : "68e48970-54f7-11e3-8f96-0800200c9a66",
		title : "Mr",
		firstName : "Aaron",
		lastName : "East",
		email : "test@test.com",
		country : "UK",
		mailingList : true
		mobile : "07511111111",
		addressLine1 : "10 Downing Street",
		addressLine2 : "",
		city : "London",
		county : ""
	},
	{
		id : "68e48970-54f7-11e3-8f96-0800200c9a66",
		title : "Miss",
		firstName : "Yulia",
		lastName : "East",
		email : "test@test1.com",
		country : "UK",
		mailingList : true
		mobile : "07511111111",
		addressLine1 : "10 Downing Street",
		addressLine2 : "",
		city : "London",
		county : ""
	}

]

```



```javascript

POST 
/user-service/register

REQUEST
{
	title : "Mr",
	firstName : "Aaron",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
	mobile : "07511111111",
	addressLine1 : "10 Downing Street",
	addressLine2 : "",
	city : "London",
	county : ""
}

RESPONSE 200
{
	id : "68e48970-54f7-11e3-8f96-0800200c9a66",
	title : "Mr",
	firstName : "Aaron",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
	mobile : "07511111111",
	addressLine1 : "10 Downing Street",
	addressLine2 : "",
	city : "London",
	county : ""
}


```


```javascript

POST 
/user-service/register/interest

REQUEST
{
	title : "Mr",
	firstName : "Aaron",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
}

RESPONSE 200
{
	id : "68e48970-54f7-11e3-8f96-0800200c9a66",
	title : "Mr",
	firstName : "Aaron",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
}


```



```javascript

PUT
/user-service/68e48970-54f7-11e3-8f96-0800200c9a66

REQUEST
{
	id : "68e48970-54f7-11e3-8f96-0800200c9a66",
	title : "Mr",
	firstName : "Aaron John",
	lastName : "East",
	email : "test@test.com",
	country : "UK",
	mailingList : true
	mobile : "07511111111",
	addressLine1 : "10 Downing Street",
	addressLine2 : "",
	city : "London",
	county : ""
}

RESPONSE 200
{
	id : "68e48970-54f7-11e3-8f96-0800200c9a66",
	title : "Mr",
	firstName : "Aaron",
	lastName : "East John",
	email : "test@test.com",
	country : "UK",
	mailingList : true
	mobile : "07511111111",
	addressLine1 : "10 Downing Street",
	addressLine2 : "",
	city : "London",
	county : ""
}


```


```javascript

DELETE 
/user-service/68e48970-54f7-11e3-8f96-0800200c9a66

RESPONSE 200

```

