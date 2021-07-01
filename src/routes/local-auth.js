const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./../database');

passport.use('register', new LocalStrategy ({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const user = await db.getUserByUsername(req.body.username);

	const existCredentials = await db.comprovatedCredentials(req.body.username, req.body.email);
	
	if (!user && existCredentials === false) {
		if (req.body.password !== req.body.passwordConfirm){
			return done(null, false, req.flash('error', 'password do not match'));
		}
		const createUser = await db.insertUser(req.body.username, req.body.email, req.body.password);
		return done(null, createUser);
	}


	return done(null, false, req.flash('error', 'User o email alredy exist'));
	
}));

passport.use('login',new LocalStrategy ({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) =>{
	const user = await db.getUserByUsername(req.body.username);
	if(user && req.body.password == user.password){
		return done(null, user);
	}
	return done(null, false, req.flash('error', 'username o password incorrect'));
	
}));

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
	const user = await db.getUserById(id);
	done(null, user);
});



