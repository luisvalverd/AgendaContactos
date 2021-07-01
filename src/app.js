const express = require('express');
const engine = require('ejs');
const path = require('path');
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');

// initialization
const app = express();
require('./routes/local-auth');
require('./database');

// variable
const routes = require('./routes/index');


// settings
app.use(expressLayout);
app.set('layout', './layouts/layout');
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
//app.set('layout', 'views/layouts');

// middlewares
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser('c0d1g0'));
app.use(session({
	secret: 'c0d1g0',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// user flash for send messages
app.use((req, res, next) => {
	app.locals.error = req.flash('error');
	app.locals.success = req.flash('success');
	//console.log(app.locals);
	next();
});


//routes
app.use('/', routes);
app.use('/signin', routes);
app.use('/signup', routes);


app.listen('3000', () => {
	console.log('escuchando en el puerto 3000');
});

