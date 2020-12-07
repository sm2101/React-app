const jwtStrat   = require('passport-jwt').Strategy,
	  extractJwt = require('passport-jwt').ExtractJwt,
	  mongoose   = require('mongoose'),
	  User       = mongoose.model('users'),
	  keys       = require('../config/keys');

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) =>{
	passport.use(new jwtStrat(opts, (jwt_payload, done) =>{
		User.findById(jwt_payload.id).then((user) =>{
			if(user){
				return done(null,user);
			}
			return done(null, false);
		}).catch(err =>{
			console.log(err);
		})
	}))
}