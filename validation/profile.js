const validator = require('validator'),
	  isEmpty   = require('./isEmpty');


module.exports = function validateProfileInput(data){
	let err = {};
	
	data.house     = !isEmpty(data.handle)? data.handle :'';
	data.wand  = !isEmpty(data.wand)? data.wand :'';
	data.rank  = !isEmpty(data.rank)? data.rank :'';
	
	if(validator.isEmpty(data.house)){
		err.house = 'Required';
	}
	if(validator.isEmpty(data.wand)){
		err.wand = 'Required';
	}
	if(validator.isEmpty(data.rank)){
		err.rank = 'Required';
	}
	return{
		err,
		isValid:isEmpty(err)
	}
}