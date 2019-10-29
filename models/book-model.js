var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from book where id=?";
		db.getResults(sql, [id], function(result){

			//console.log(result);
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
    },
    
	getByEmail: function(email, callback){
		var sql = "select * from book where email=?";
		db.getResults(sql, [email], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where email=? and password=?";

		db.getResults(sql, [user.email, user.password], function(result){

			if(result.length > 0 ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from book";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insertBook : function(user, callback){
		var sql = "insert into book values('', ?, ?, ?, ?, ?)";
		db.execute(sql, [user.bname, user.aname, user.category, user.price, user.email], function(status){
			callback(status);
		});
	},
	insertOrder : function(book, callback){
		var sql = "insert into order values('', ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [book.id, book.bname, book.aname, book.category, book.price, book.email], function(status){
			callback(status);
		});
	},
	update : function(book, callback){
		var sql = "update book set bname=?, aname=?, category=?, price=? where id=?";		
			db.execute(sql, [book.bname, book.aname, book.category, book.price, book.id], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		//var sql = "insert into user values('','"+ user.username+"', '"+user.password+"')";
		db.execute(sql, [],  function(status){
			callback(status);
		});
	}
}	


