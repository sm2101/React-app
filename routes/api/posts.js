const express = require('express'),
	  router  = express.Router(),
	  mongoose = require('mongoose'),
	  passport = require('passport'),
	  Post = require('../../models/Post'),
	  Profile = require('../../models/Profile'),
	  validatePostInput = require('../../validation/post');

router.get('/test' ,(req,res) =>{
	res.json({msg:'works'});
})

router.get('/',(req,res) =>{
	Post.find().sort({date :-1}).then(posts =>{
		res.json(posts);
	}).catch(res.status(404));
})

router.get('/:id',(req,res) =>{
	Post.findById(req.params.id).then(posts =>{
		res.json(posts);
	}).catch(res.status(404));
})
// Private Routes
router.post(
	'/',
	passport.authenticate
	('jwt',
	 {
		session:false
	}
	),
	(req,res)=>{
		
		const {errors, isValid} = validatePostInput(req.body);
		
		if(!isValid){
			return res.status(400).json(errors);
		}
		
		const newPost = new Post({
			text:req.body.text,
			name:req.body.name,
			avatar:req.body.avatar,
			user:req.user.id
		});
		newPost.save().then(post =>{
			res.json(post);
		})
	}
)
router.get('/:usr_id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	Post.find({user:req.params.usr_id}).sort({date:-1}).then(posts =>{
		res.json(posts);
	}).catch(res.status(404));
})
router.delete('/:id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	Profile.findOne({user:req.user.id}).then(profile =>{
		Post.findById(req.params.id).then(post =>{
			if(post.user.toString !== req.user.id){
				return res.status(401).json({notAuthorised:'User not authorised'});
			}
			
			post.remove().then(()=>{
				res.json({success:true})
			});
		}).catch(err =>{
			res.status(400).json({postnotfound:'No Posts Found'});
		})
	})
})

module.exports = router;