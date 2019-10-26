var express = require('express');
var userModel = require('./../models/user-model');
var bookModel = require('./../models/book-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.session.email != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	if(req.session.email != null){
		var email = req.session.email;
		bookModel.getByEmail(email, function(results){
			//console.log(results);
			res.render('user/index', {book: results});
		});	
	}else{
		res.redirect('/login');
	}
			
});

router.get('/profile', function(req, res){
	var user = req.session.email;
	//console.log(user);
	userModel.getByEmail(user, function(result){
		res.render('user/profile', {user: result});
		
		});
		
});
router.post('/profile', function(req, res){

	var user = {
		email: req.session.email,
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('/user/profile');
		}
	});
});



router.get('/addbook', function(req, res){
	res.render('user/addbook');
});

router.post('/addbook', function(req, res){
	var cat = req.body.category;
	var user = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		price: req.body.price,
		email: req.session.email
	};
	console.log(user.email);
	bookModel.insertBook(user, function(status){
		if(status){
			//res.send("Inserted");
			res.redirect('/user');
		}else{
			res.send("Not Inserted");
			//res.redirect('/user/addbook');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		res.render('user/edit', {user: results[0]});		
	});

});

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		id: req.params.id
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('user/details', {user: result});
	});
});

module.exports = router;
