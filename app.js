var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use('/api', bookRouter);

bookRouter.route('/Books')
	.get(function(req, res) {
		var responseJson = {'hello':'Welcome to the API'};
		res.json(responseJson);
	});

app.get('/', function(req, res) {
	res.send('Welcome to my API !');
});

app.listen(port, function() {
	console.log('Gulp running my app on the port ' + port);
});