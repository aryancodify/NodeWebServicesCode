var mongoose = require('mongoose');
mongoose.connect('mongodb://book_db:book_db@ds031988.mongolab.com:31988/book_db');
module.exports = mongoose.connection;