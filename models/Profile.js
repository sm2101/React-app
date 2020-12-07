const mongoose = require('mongoose'),
	  Schema   = mongoose.Schema;

const ProfileSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref:'users'
	},
	nickName:{
		type:String
	},
	house:{
		type:String,
		required:true
	},
	wand:{
		type:String,
		required:true
	},
	rank:{
		type:String,
		required:true
	},
	points:{
		type:Number,
		required:true
	}
// 	add more
})

module.exports = Profile = mongoose.model('profile',ProfileSchema);