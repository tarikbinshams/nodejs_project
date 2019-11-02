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
    getAllDonateById : function(id, callback){

		var sql = "select * from donatebook where id=?";
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
	getByEmailUser : function(email, callback){
		var sql = "select * from user where email=?";
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
	getSearch : function(search, callback){
		var sql = "select * from book where bname=? or aname=? or category=?";
		db.getResults(sql, [search, search, search], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getSearchByEmail : function(search, email, callback){
		var sql = "select * from book where (bname=? or aname=? or category=?) and email!=?";
		db.getResults(sql, [search, search, search, email], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from book order by id desc";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllCompletedOrder : function(callback){
		var sql = "select * from completeorders";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllOrder : function(callback){
		var sql = "select * from bookorder";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllDonate : function(callback){
		var sql = "select * from donatebook";

		db.getResults(sql, [], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllDonateByEmail : function(email, callback){
		var sql = "select * from donatebook where email !=?";

		db.getResults(sql, [email], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllDonateByEmail1 : function(email, callback){
		var sql = "select * from donatebook where email=?";
		db.getResults(sql, [email], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllRequest : function(callback){
		var sql = "select * from requestbook";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	
	getAllByEmail : function(email, callback){
		var sql = "select * from book where email !=?";

		db.getResults(sql, [email], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getOrderByEmail : function(email, callback){
		var sql = "select * from bookorder where bemail=?";

		db.getResults(sql, [email], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getOrderById : function(id, callback){
		var sql = "select * from bookorder where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllandEmail : function(email, callback){
		var sql = "select * from book where email=?";
		db.getResults(sql, [email], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
		var sql = "select * from book";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insertBook : function(book, callback){
		var sql = "insert into book values('', ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [book.bname, book.aname, book.category, book.price, book.email, book.filename], function(status){
			callback(status);
		});
	},
	insertDonateBook : function(book, callback){
		var sql = "insert into donatebook values('', ?, ?, ?, ?, ?)";
		db.execute(sql, [book.bname, book.aname, book.category, book.email, book.filename], function(status){
			callback(status);
		});
	},
	insertRequestBook : function(book, callback){
		var sql = "insert into requestbook values('', ?, ?, ?, ?)";
		db.execute(sql, [book.bname, book.aname, book.category, book.email], function(status){
			callback(status);
		});
	},
	insertOrder : function(book, callback){
		var sql = "insert into bookorder values('', ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [book.id, book.bname, book.aname, book.category, book.price, book.bemail, book.semail], function(status){
			callback(status);
		});
	},
	insertCompletedOrder : function(order, callback){
		var sql = "insert into completeorders values('', ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [order.id, order.bid, order.bname, order.aname, order.category, order.price, order.bemail, order.semail], function(status){
			callback(status);
		});
	},
	update : function(book, callback){
		var sql = "update book set bname=?, aname=?, category=?, price=? where id=?";		
			db.execute(sql, [book.bname, book.aname, book.category, book.price, book.id], function(status){
				callback(status);
			});
		
	},
	deleteOrderedBook : function(id, callback){
		var sql = "DELETE FROM book WHERE id=?"
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	deleteOrderedDonateBook : function(id, callback){
		var sql = "DELETE FROM donatebook WHERE id=?"
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	deleteOrder : function(id, callback){
		var sql = "DELETE FROM bookorder WHERE id=?"
		db.execute(sql, [id], function(status){
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


