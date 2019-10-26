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
		password: req.body.password

	};
	userModel.insert(user, function(status){
		if(status){
			res.send("Inserted");
		}else{
			res.send("Error");
		}
	});

});



module.exports = router;


