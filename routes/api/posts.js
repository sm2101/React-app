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
router.post('/like/:id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	Profile.findOne({user:req.user.id}).then(profile =>{
		Post.findById(req.params.id).then(post =>{
			if(post.likes.filter(like => like.user.toString() === req.user.id).length >0){
				return res.status(400).json({alreadyLiked :'User already liked the post'})
			}
			post.likes.unshift({user:req.user.id});
			
			post.save().then(post =>{
				return res.json(post);
			})
		}).catch(err =>{
			res.status(400).json({postnotfound:'No Posts Found'});
		})
	})
})
router.post('/unlike/:id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	Profile.findOne({user:req.user.id}).then(profile =>{
		Post.findById(req.params.id).then(post =>{
			if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
				return res.status(400).json({notLiked :'You havent liked the post'})
			}
			
			const rIdx = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
			post.likes.splice(rIdx,1);
			post.save().then(post =>{
				res.json(post)
			})
		}).catch(err =>{
			res.status(400).json({postnotfound:'No Posts Found'});
		})
	})
})
router.post('/comment/:id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	const {errors, isValid} = validatePostInput(req.body);
		
		if(!isValid){
			return res.status(400).json(errors);
		}
	Post.findById(req.params.id).then(post =>{
		const newComment = {
			text :req.body.text,
			name:req.body.name,
			avatar:req.body.name,
			user:req.user.id
		}
		
		post.comment.unshift(newComment);
		post.save()
			.then(post => res.json(post))
			.catch(err => res.status(404).json({postNotFound:'No Post Found'}));
	})
})
router.delete('/comment/:id/:comment_id',
		   passport.authenticate
			('jwt',
			 {
				session:false
			}),
		   (req,res) =>{
	Post.findById(req.params.id).then(post =>{
		if(post.comment.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
			return res.status(404).json({noComment:"Comment Doesn't Exist"});
		}
		const rIdx = post.comments
			.map(item => item._id.toString())
			.indexOf(req.params.comment_id);
		post.comments.splice(rIdx,1);
		post.save().then(post => res.json(post));
	})
})
module.exports = router;