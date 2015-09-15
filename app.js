var express = require('express')
bodyParser = require('body-parser'),
Book = require('./models/bookModel');

var db = require('./db');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);


app.get('/', function(req, res) {
	res.send('Welcome to my API !');
});

app.listen(port, function() {
	console.log('Gulp running my app on the port ' + port);
});