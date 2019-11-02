var express = require('express');
var userModel = require('./../models/user-model');
var bookModel = require('./../models/book-model');
//var sessionstorage = require('sessionstorage');
//var multer = require('multer');
//var upload = multer({dest: 'public/uploads/'});
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.session.username != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	res.render('admin/index');		
});

router.get('/post', function(req, res){
	bookModel.getAll(function(results){
		res.render('admin/post', {book: results});	
	});		
});

router.get('/order', function(req, res){
	bookModel.getAllOrder(function(results){
		res.render('admin/order', {order: results});	
	});	
});
router.get('/order/:id', function(req, res){
	var id = req.params.id;
	bookModel.getOrderById(id, function(result){
		var order = result[0];
		var oid = result[0].id;
		console.log(order);
		bookModel.insertCompletedOrder(order, function(status){
			if(status){
				bookModel.deleteOrder(oid, function(status){
					if(status){
						res.redirect('/admin/order');
						/* bookModel.getAllOrder(function(results){
							res.render('admin/order', {order: results});	
						}); */	
					}else{
						res.send("Donot delete");
					}
				});	
			}else{
				res.redirect('/admin');
			}
		});
	});
});
router.get('/user', function(req, res){
	userModel.getAllUser(function(results){
		res.render('admin/user', {user: results});	
	});	
});
router.get('/orderhistory', function(req, res){
	bookModel.getAllCompletedOrder(function(results){
		res.render('admin/orderhistory', {order: results});
	});	
});
router.get('/donate', function(req, res){
	bookModel.getAllDonate(function(results){
		res.render('admin/donate', {book: results});	
	});	
});
router.get('/request', function(req, res){
	bookModel.getAllRequest(function(results){
		res.render('admin/request', {book: results});	
	});		
});
router.get('/request', function(req, res){
	bookModel.getAllRequest(function(results){
		res.render('admin/request', {book: results});	
	});		
});
router.get('/addadmin', function(req, res){
	res.render('admin/addadmin');
});
router.post('/addadmin', function(req, res){
	var admin = {
		username: req.body.username,
		password: req.body.password
	}
	if(req.body.username == ""){
		res.send("Usernameame con not be empty!");
	}
	if(req.body.username.length > 6){
		res.send("Username can not be more than 6 character long.");
	}
	if(req.body.password == ""){
		res.send("Password con not be empty!");
	}
	if(req.body.password.length > 6){
		res.send("Password can not be more than 6 character long.");
	}

	userModel.validateUserName(req.body.username, function(result){
		if(result.length > 0){
			res.send("This username is already registered.");
		}
		else{
			userModel.insertAdmin(admin, function(result){
				if(result.length > 0){
					res.send("Error");
				}else{
					res.render('admin/index');
				}	
			});	
		} 
		
	});	
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



router.get('/add', function(req, res){
	res.render('admin/add');
});

router.post('/add', function(req, res, next){
	//res.send(req.files);
	var cat = req.body.category;
	var book = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		price: req.body.price,
		email: req.session.email
	};
	//console.log(book.email);
	bookModel.insertBook(book, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.send("Not Inserted");
			//res.redirect('/user/addbook');
		}
	});
});

router.get('/donatebook', function(req, res){
	res.render('user/donatebook');
});

router.post('/donatebook', function(req, res, next){
	//res.send(req.files);
	var cat = req.body.category;
	var book = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		email: req.session.email
	};
	bookModel.insertDonateBook(book, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('/user/donatebook');
		}
	});
});

router.get('/edit/:id', function(req, res){

	//res.render('user/edit');
	bookModel.getById(req.params.id, function(results){
		res.render('user/edit', {book: results});		
	});

});

router.post('/edit/:id', function(req, res){
	var id = req.params.id;
	var book = {
		id: req.params.id,
		bname: req.body.bname,
		aname: req.body.aname,
		category: req.body.category,
		price: req.body.price
	};

	bookModel.update(book, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('/user/edit');
		}
	});
});


module.exports = router;
