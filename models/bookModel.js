//json object that lays out how the book will look like
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var bookModel = new Schema({
	title:{
		type:String
	},
	genre:{
		type:String
	},
	author:{
		type:String
	},
	read:{
		type:Boolean,
		default:false
	}
});

module.exports = mongoose.model('Book',bookModel);