var bookController = function(Book) {
	var post = function(req, res) {
		var book = new Book(req.body);
		saveBook(book, function(err, book) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(book);
			}
		});
	}
}