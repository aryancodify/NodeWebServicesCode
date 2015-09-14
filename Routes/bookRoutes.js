var express = require('express');
var db = require('../db');
var Book = require('../models/bookModel');
var routes = function(){
	var bookRouter = express.Router();
	bookRouter.route('/books')
	.post(function(req, res) {
		var book = new Book(req.body);
		book.save(function(err, bookk) {
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
bookRouter.route('/books/:bookId').get(function(req, res) {
	Book.findById(req.params.bookId, function(err, book) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(book);
		}
	});
});
return bookRouter;
};
module.exports = routes;
