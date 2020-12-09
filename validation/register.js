const validator = require('validator'),
	  isEmpty   = require('./isEmpty');


module.exports = function validateRegisterInput(data){
	let err = {};
	
	data.name      = !isEmpty(data.name)? data.name :'';
	data.email     = !isEmpty(data.email)? data.email :'';
	data.password  = !isEmpty(data.password)? data.password :'';
	data.password2 = !isEmpty(data.password2)? data.password2 :'';
	if(!validator.isLength(data.name, {min :2, max:30})){
		err.name = 'Name must be between 2 to 30 charachters';
	}
	if(validator.isEmpty(data.name)){
		err.name = 'Name field is required';
	}
	if(validator.isEmpty(data.email)){
		err.email = 'Email field is required';
	}
	if(!validator.isEmail(data.email)){
		err.email = 'Email is invalid';
	}
	if(validator.isEmpty(data.password)){
		err.password = 'Password field is required';
	}
	if(!validator.isLength(data.password, {min:6,max :30})){
		err.password = 'Password must be atleast 6 charachters';
	}
	if(validator.isEmpty(data.password2)){
		err.password2 = 'Confirm Password field is required';
	}
	if(!validator.equals(data.password, data.password2)){
		err.password2 = 'Passwords must match';
	}
	return{
		err,
		isValid:isEmpty(err)
	}
}