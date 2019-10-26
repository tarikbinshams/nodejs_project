//DECLARATION
var express  	= require('express');
var ejs  		= require('ejs');
var exSession  	= require('express-session');
var user  		= require('./controllers/user');
var login  		= require('./controllers/login');
var registration= require('./controllers/registration');
var bodyParse  	= require('body-parser');
var logout  	= require('./controllers/logout');
var app 		= express();

//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"i love js", saveUninitialized:true, resave:false}));
app.use('/user', user);
app.use('/login', login);
app.use('/registration', registration);
app.use('/logout', logout);

//ROUTING
app.get('/', function(req, res){
	res.send('<h1>Project Default Page</h1>');
});


//SERVER STARTUP
app.listen(5000, function(){
	console.log('Server started at 5000...');
});
