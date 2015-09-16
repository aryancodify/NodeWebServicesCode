var should = require('should'),
	sinon = require('sinon');


describe('Book Controller Tests', function() {
	describe('Post', function() {
		it('should not allow an empty title on Post', function() {
			//Send in a mock book, mock request and a mock response
			var Book = function(book) {this.save = function(){}};

			var req = {
				body: {
					author: 'Aryan'
				}
			};
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
		var bookController = require('../Controllers/bookController')(Book);
		bookController.post(req,res);
		res.status.calledWith(400).should.equal(true,'Bad Status '+ res.status.args[0][0]);
		res.send.calledWith('Title is Required').should.equal(true);
		})

	})
})