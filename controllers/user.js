var express = require('express');
var userModel = require('./../models/user-model');
var bookModel = require('./../models/book-model');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+'-'+file.originalname);
	}
});

var upload = multer({ storage });
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
			bookModel.getOrderByEmail(email, function(results1){
				res.render('user/index', {book: results, order: results1});
			}); 
		});
	}else{
		res.redirect('/login');
	}
	
			
});


router.get('/profile', function(req, res){
	var user = req.session.email;
	userModel.getByEmail(user, function(result){
		res.render('user/profile', {user: result});
	});
		
});
router.post('/profile', function(req, res){
	var user = {
		email: req.session.email,
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password,
		location: req.body.location
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

router.post('/addbook', upload.single('img'), function(req, res, next){
	//res.send(req.files);
	var cat = req.body.category;
	var filename1 = req.file.filename;
	var book = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		price: req.body.price,
		email: req.session.email,
		filename: filename1
	};
	var numbers = /^[-+]?[0-9]+$/;
      if(!(req.body.price.match(numbers)))
      {
		  res.send("Enter a valid price");
	  }else{
		bookModel.insertBook(book, function(status){
			if(status){
				res.redirect('/user');
			}else{
				res.send("Not Inserted");
			}
		});
	  }
});

router.get('/donatebook', function(req, res){
	res.render('user/donatebook');
});

router.post('/donatebook', upload.single('img'), function(req, res, next){
	//res.send(req.files);
	var cat = req.body.category;
	var filename1 = req.file.filename;
	var book = {
		bname: req.body.bname,
		aname: req.body.aname,
		category: cat,
		email: req.session.email,
		filename: filename1
	};
	//console.log(user.email);
	bookModel.insertDonateBook(book, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('/user/donatebook');
		}
	});
});
router.get('/mydonate', function(req, res){
	bookModel.getAllDonateByEmail1(req.session.email, function(results){
		res.render('user/mydonate', {book: results});
	})
	
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
	var numbers = /^[-+]?[0-9]+$/;
      if(!(req.body.price.match(numbers)))
      {
		  res.send("Enter a valid price");
	  }
	bookModel.update(book, function(status){
		if(status){
			res.redirect('/user');
		}else{
			res.redirect('/user/edit');
		}
	});
});

router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('user/details', {user: result});
	});
});

module.exports = router;
