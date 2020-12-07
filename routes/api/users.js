const express               = require('express'),
	  router                = express.Router(),
	  User                  = require("../../models/User"),
	  bcrypt                = require('bcryptjs'),
	  jwt                   = require('jsonwebtoken'),
	  keys                  = require('../../config/keys'),
	  passport              = require('passport'),
	  validateRegisterInput = require('../../validation/register'),
	  validateLoginInput    = require('../../validation/login');

// Public routes
router.get('/test' ,(req,res) =>{
	res.json({msg:'works'});
})

   // registration route

router.post('/register', (req,res) =>{
	
	const{err,isValid} = validateRegisterInput(req.body);
	
	if(!isValid){
		return res.status(400).json(err);
	}
	
	User.findOne({
		email :req.body.email
	}).then((user) =>{
		if(user){
			return res.status(400).json({
				email:'Email already exists'
			})
		} else {
			const newUser = new User({
				name:req.body.name,
				email:req.body.email,
				avatar:'https://i.imgur.com/rQ0wDAq.jpg',
				password: req.body.password
			});
			
			bcrypt.genSalt(10 ,(err,salt) =>{
				bcrypt.hash(newUser.password, salt, (err ,hash) =>{
					if(err){
						throw err;
					}
					newUser.password = hash;
					newUser.save().then((user) =>{
						res.json(user);
					}).catch((err) =>{
						console.log(err);
					})
				})
			})
		}
	})
})
//  login route
router.post('/login', (req,res) =>{
	
	const{err,isValid} = validateLoginInput(req.body);
	
	if(!isValid){
		return res.status(400).json(err);
	}
	
	const email = req.body.email,
		  pass  = req.body.password;
	
// 	find
	
	User.findOne({
		email
	}).then((user) =>{
		if(!user) {
			err.email = "User not found"
			return res.status(404).json(err)
		}
// 		pass check
		bcrypt.compare(pass, user.password).then((isMatch)=>{
			if(isMatch){
// 				user match
				const payLoad = {
					id:user['_id'],
					name:user.name,
					avatar:user.avatar
				}
// 				sign token
				jwt.sign(
					payLoad, 
					keys.secret, 
					{
					expiresIn:3600 
					}, 
					(err,token) => {
						res.json({
							success:true,
							token :'Bearer '+token
						})
					});
			} else {
				err.password = 'Password Incorrect';
				return res.status(400).json(err)
			}
		})
	})
})

// protected routes
router.get('/user', passport.authenticate('jwt', {session: false}) ,(req,res) =>{
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	});
})

module.exports = router;  