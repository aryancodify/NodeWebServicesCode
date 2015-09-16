var bookController = function(Book) {
	var post = function(req, res) {
		var book = new Book(req.body);
		if(!req.body.title){
			console.log('here');
			res.status(400);
			res.send('Title is required');
		}else{
		saveBook(book, function(err, book) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				res.status(201);
				res.send(book);
			}
		});
	}
}
	var get = function(req, res) {
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
		}
	var getBookById = function(req, res) {
		res.send(req.book);
	}
	var put = function(req, res) {
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
	}
	var patch = function(req, res) {
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
	}
	var deleteBook = function(req, res) {
		req.book.remove(function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(204).send('Removed that book');
			}
		});
	}
		return{
			post:post,
			get:get,
			getBookById:getBookById,
			put:put,
			patch:patch,
			deleteBook:deleteBook
		}
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
module.exports = bookController;