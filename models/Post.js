const mongoose = require('mongoose'),
	  Schema   = mongoose.Schema;

const PostSchema = new Schema({
	user:{
		type :Schema.Types.ObjectId,
		ref:'usrers'
	},
	text:{
		type:String,
		required:true
	},
	name:{
		type:String
	},
	avatar:{
		type: String
	},
	date:{
		type:Date,
		default:Date.now
	},
	likes:[
		{
			user:{
				type :Schema.Types.ObjectId,
				ref:'usrers'
			}
		}
	],
	comments:[
		{
			user:{
				type :Schema.Types.ObjectId,
		ref:'usrers'
			},
			text:{
				type:String,
				required:true
			},
			name:{
				type:String
			},
			avatar:{
				type: String
			},
			date:{
				type:Date,
				default:Date.now
			}
		}
	]
})

module.exports = Post = mongoose.model('posts',PostSchema);