const express = require('express');
const passport = require('passport');
const auth = require('./local-auth');
const db = require('./../database');
const contacts = require('./contacts');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/signin', (req, res) =>{
	res.render('signin');
});

router.post('/signin', passport.authenticate('login', {
	successRedirect: '/profile',
	failureRedirect: '/signin',
	passReqToCallback: true
}));

router.get('/signup', (req, res, next) => {
	res.render('signup');
});

router.post('/signup', passport.authenticate('register', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
	req.logOut();
	res.redirect('/');
});

router.use((req, res, next) => {
	isAuthenticated(req, res, next);
});

router.get('/enter-contacts', (req, res, next) => {
	res.render('enter-contacts');
});

router.post('/enter-contacts', (req, res, next) => {
	contacts.createContact(req.body, req.session.passport.user);
	res.redirect('/profile');
});

router.get('/profile', async (req, res, next) => {
	const datas = await db.getContacts(req.session.passport.user);
	res.render('profile', {datas: datas});
});

router.get('/delete/:id', (req, res, next) => {
	contacts.deleteContact(req.params.id);
	res.redirect('/profile');
});

router.get('/edit/:id', async (req, res, next) => {
	const data = await db.getContactById(req.params.id);
	res.render('edit', {data: data});
});

router.post('/edit/:id', async (req, res, next) => {
	db.editContact(req.body.name, req.body.lastname, req.body.phone, req.params.id);
	res.redirect('/profile')
});

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = router;