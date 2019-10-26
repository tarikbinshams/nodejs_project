var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var user = {
		email: req.body.email,
		password: req.body.password
	}
	userModel.validate(user, function(status){
		
		if(status){
			req.session.email = req.body.email;
			res.redirect('/user');	
		}else{
			res.redirect('/login');
		}
	});
});



module.exports = router;


