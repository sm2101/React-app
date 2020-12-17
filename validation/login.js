const validator = require('validator'),
	  isEmpty   = require('./isEmpty');


module.exports = function validateLoginInput(data){
	let err = {};
	
	data.email     = !isEmpty(data.email)? data.email :'';
	data.password  = !isEmpty(data.password)? data.password :'';
	
	if(!validator.isEmail(data.email)){
		err.loginEmail = 'Email is invalid';
	}
	if(validator.isEmpty(data.email)){
		err.loginEmail = 'Email field is required';
	}
	if(validator.isEmpty(data.password)){
		err.loginPassword = 'Password field is required';
	}
	return{
		err,
		isValid:isEmpty(err)
	}
}