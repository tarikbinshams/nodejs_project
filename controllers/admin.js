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
router.get('/orderhistory', function(req, res){
	res.render('admin/orderhistory');		
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
	userModel.insertAdmin(admin, function(status){
		if(status){
			res.render('admin/index');
		}else{
			res.send("Error");
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
