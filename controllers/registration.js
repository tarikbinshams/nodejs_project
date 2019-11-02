var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('registration/index');
});

router.post('/', function(req, res){
	var user = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		location: req.body.location

	};
	console.log(req.body.name.length);
	if(user.name == ""){
		res.send("Name con not be empty!");
	}
	if(req.body.name.length <3){
		res.send("Name must be 3 character long");
	}
	if(req.body.name.length > 10){
		res.send("Name length can not be more than 10 character");
	}
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!(req.body.email.match(mailformat))){
		res.send("Please enter valid email");
	}
	var phoneno = /^\d{11}$/;
  	if(!(req.body.phone.match(phoneno))){
		res.send("Please enter valid phone number");
	}
	if(req.body.password.length <2 ){
		res.send("Password must be 2 character long");
	}
	if(req.body.password.length > 6 ){
		res.send("Password con not be more than 6 character");
	}
	if(req.body.location.length > 12 ){
		res.send("Password con not be more than 12 character");
	}

	userModel.validateEmail(req.body.email, function(result){
		if(result.length > 0){
			res.send("This email is already registered.");
		}
		else{
			userModel.insert(user, function(status){
				if(status){
					res.send("Inserted");
				}else{
					res.send("Error");
				}
			});
		} 
		
	});
});
module.exports = router;


