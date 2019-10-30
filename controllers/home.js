"use strict";
var express = require('express');
var bookModel = require('./../models/book-model');
var userModel = require('./../models/user-model');
var router = express.Router();


router.get('/', function(req, res){
	if(req.session.email == null){
		bookModel.getAll(function(results){
			var result = {
				name: "Log in"
			}
			res.render('home/index',{book: results, user: result});
		});
	}else{
		bookModel.getAll(function(results){
			var result = {
				name: "Welcome"
			}
			res.render('home/index',{book: results, user: result});
		});
		/* var email = req.session.email;
		bookModel.getAllandEmail(email, function(results){
			console.log(results[1]);
			res.render('home/index',{book: results[1], user: results[0]});
		}); */

	}
	
	
});

router.post('/', function(req, res){
	var search = req.body.search;
	if(search == ""){
		console.log(search);
		res.redirect('/home');
	}else{
		if(req.session.email == null){
			bookModel.getAll(function(results){
				var result = {
					name: "Log in"
				}
				res.render('home/search',{book: results, user: result});
			});
		}else{
			bookModel.getAll(function(results){
				var result = {
					name: "Welcome"
				}
				res.render('home/search',{book: results, user: result});
			});
		}
		
	}
});

router.get('/buy/:id', function(req, res){

	//res.render('user/edit');
	bookModel.getById(req.params.id, function(results){
		//console.log(results);
		res.render('home/buy', {book: results});		
	});

});

router.post('/buy/:id', function(req, res){
	if(req.session.email == null){
		res.send("Please login first");
	}else{
		//console.log(req.session.email);
		var id = req.params.id;
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
				res.redirect('/user');
			}else{
				res.redirect('/buy/:id');
			}
		});
	}
});

router.get('/requestbook', function(req, res){
	res.render('home/requestbook');
});

router.post('/requestbook', function(req, res, next){
	//res.send(req.files);
	if(req.session.email == null){
		res.send("Please login");
	}else{
		var cat = req.body.category;
		var book = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		email: req.session.email
		};
		bookModel.insertRequestBook(book, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/user/addbook');
			}
	});
	}
	
});

module.exports = router;


