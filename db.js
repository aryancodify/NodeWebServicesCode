var mongoose = require('mongoose');
if(process.env.ENV === 'Test')
	mongoose.connect('mongodb://book_db:book_db@ds031988.mongolab.com:31988/book_db');
else
mongoose.connect('mongodb://book_db:book_db@ds031988.mongolab.com:31988/book_db');
module.exports = mongoose.connection;