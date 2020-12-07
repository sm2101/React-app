const express              = require('express'),
	  router               = express.Router(),
	  mongoose             = require('mongoose'),
	  passport             = require('passport'),
	  Profile              = require('../../models/Profile'),
	  User                 = require('../../models/User'),
	  validateProfileInput = require('../../validation/profile');


// Public routes
router.get('/test' ,(req,res) =>{
	res.json({msg:'works'});
})

// Protected routes
router.get(
	'/',
	passport.authenticate(
		'jwt',
		{
			session:false
		}),
	(req,res) =>{
		const errors = {};
		Profile.findOne({user:req.user.id}).populate('user',['name','avatar']).then(profile =>{
			if(!profile){
				err.noProfile = "Profile Not Found";
				res.status(404).json(errors);
			}
			res.json(profile);
		}).catch(err =>{
			res.status(404).json(err);
		})
	}
)

router.post(
	'/',
	passport.authenticate(
		'jwt',
		{
			session:false
		}),
	(req,res) =>{
		
		const{err, isValid} = validateProfileInput(req.body);
		
		if(!isValid){
			return res.status(400).json(err)
		}
		
		const profileField = {
			house:req.body.house,
			wand:req.body.wand,
			rank:req.body.rank,
			points:req.body.points
		};
		profileField.user = req.user.id;
		if(req.body.nickName) profileField.nickName = req.body.nickName;
		
		Profile.findOne({user: req.user.id}).then(profile =>{
			if(profile){
				Profile.findOneAndUpdate({
					user:req.user.id
				},{
					$set:profileField
				},{
					new:true
				}).then(profile => res.json(profile));
			} else {
				new Profile(profile).save().then(profile =>{
					res.json(profile);
				})
			}
		})
		
	}
)

router.get(
	'/user/:user_id',
	passport.authenticate(
		'jwt',
		{
			session:false
		}),
	(req,res)=>{
		err = {};
		Profile.findOne({user :req.params.user_id}).populate(
			'user',['name','avatar']
		).then(profile =>{
			if(!profile){
				err.noProfile = "Profile was not found"
				res.status(404).json(err);
			}
			
			res.json(profile);
		}).catch(err => res.status(404).json(err));
	}
)
module.exports = router;