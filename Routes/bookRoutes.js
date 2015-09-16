var express = require('express');
var db = require('../db');

var routes = function(Book) {
	var bookRouter = express.Router();

	var bookController = require('../Controllers/bookController')(Book);
	bookRouter.route('/')
		.post(bookController.post)
		.get(function(req, res) {
			var query = {};
			if (req.query.genre) {
				query.genre = decodeURI(req.query.genre);
			}
			Book.find(query, function(err, books) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(books);
				}
			});
		});

	bookRouter.use('/:bookId', function(req, res, next) {
		Book.findById(req.params.bookId, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(404).send('Book Not Found !');
			}
		});
	});

	bookRouter.route('/:bookId').get(function(req, res) {
		res.send(req.book);
	}).
	put(function(req, res) {
		req.book.title = req.body.title;
		req.book.genre = req.body.genre;
		req.book.read = req.body.read;
		req.book.author = req.body.author;
		saveBook(req.book, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(book);
			}
		});
	}).patch(function(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		for (var attr in req.body) {
			req.book[attr] = req.body[attr];
		}
		saveBook(req.book, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(book);
			}
		});
	}).delete(function(req, res) {
		req.book.remove(function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(204).send('Removed that book');
			}
		});
	});
	return bookRouter;
}

function saveBook(book, bookSaved) {
	book.save(function(err, book) {
		if (err) {
			bookSaved(err, null);
		} else {
			bookSaved(null, book);
		}
	});
}
module.exports = routes;