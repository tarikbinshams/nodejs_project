var express = require('express');
var bookModel = require('./../models/book-model');

var router = express.Router();

router.get('/', function(req, res){
	bookModel.getAll(function(results){
		res.render('home/index',{book: results});
	});
	
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

router.get('/buy/:id', function(req, res){

	//res.render('user/edit');
	bookModel.getById(req.params.id, function(results){
		console.log(results);
		res.render('home/buy', {book: results});		
	});

});

router.post('/buy/:id', function(req, res){
	if(req.session.email == null){
		res.send("Please login first");
	}else{
		console.log(req.session.email);
		res.send("Ordered");
		/* var id = req.params.id;
		var book = {
			id: req.params.id,
			bname: req.body.bname,
			aname: req.body.aname,
			category: req.body.category,
			price: req.body.price,
			email: req.session.email
		};

		bookModel.insertOrder(book, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/home/edit');
			}
		}); */
	}
});

module.exports = router;


