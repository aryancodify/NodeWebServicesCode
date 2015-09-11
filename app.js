var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use('/api', bookRouter);

bookRouter.route('/Books')
	.get(function(req, res) {
		Book.find(function(err,books){
			if(err){
				console.log(err)
			}
			else{
				res.json(books);
			}
		});
		res.json(responseJson);
	});

app.get('/', function(req, res) {
	res.send('Welcome to my API !');
});

app.listen(port, function() {
	console.log('Gulp running my app on the port ' + port);
});