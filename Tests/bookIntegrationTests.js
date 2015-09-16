var should = require('should'),
	request = require('supertest'),
	app = ('../app.js'),
	mongoose = require('mongoose'),
	Book = require('../models/bookModel'),
	agent = request.agent(app);

describe( 'Book CRUD Test',function(){
	it('Should allow a book to be posted and return a read and _id ',function(done){
		var bookPost = {title:'My New book',author:'Aryan Singh',genre:'fiction'};

		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.timeout(1000)
			.end(function(err,results){
				results.body.read.should.not.equal(false);
				results.body.should.have.property('_id');
				done()
			})
	})

	afterEach(function(done){
		Book.remove().exec();
		done();
	})

});