const validator = require('validator'),
	  isEmpty   = require('./isEmpty');


module.exports = function validatePostInput(data){
	let err = {};
	
	data.text     = !isEmpty(data.text)? data.text :'';
	
	if(validator.isEmpty(data.text)){
		err.text = 'Text Field is required';
	}

	return{
		err,
		isValid:isEmpty(err)
	}
}