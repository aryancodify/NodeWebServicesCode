var express = require('express');
var routes = function(Book) {
	var bookRouter = express.Router();
	bookRouter.use('/:bookId',function(req,res.next){
			Book.findById(req.params.bookId, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} 
			else if(){
				req.book = book;
				next();
			}else {
				res.status(404).send('no book found');
			}
		});
	});
	bookRouter.route('/')
		.post(function(req, res) {
			var book = new Book(req.body);
			book.save(function(err, book) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(201).send(book);
				}
			});
		})
		.get(function(req, res) {
			var query = {};
			if (req.query.genre) {
				query.genre = decodeURI(req.query.genre);
			}
			Book.find(query, function(err, books) {
				if (err) {
					res.status(500).send(err);
				} else {
					console.log(books);
					res.json(books);
				}
			});
		});
	bookRouter.route('/:bookId').get(function(req, res) {
		res.json(req.book);
	}).
	put(function(req, res) {
		Book.findById(req.params.bookId, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else {
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.read = req.body.read;
				book.save();
				res.json(book);
			}
		});
	}).
	patch(fu);
	return bookRouter;
};
module.exports = routes;