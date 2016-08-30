//create book model for mongoose

//step 1: bring in dependencies to create a schema:
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment').schema;

// step 2: create actual schema;
var bookSchema = new Schema({
  //two types of notation: object literal or type
  //needs to have these two things because of required;
  title: { type: String, required: true },
  author: String,
  publishDate: Date,
  publishedBy: String,
  //adding a new field that is from comments.js; an array of comment models - sub document
  comments: [Comment]
});

// step 3: create the model;
//we will export this model so we can do schemas on;
//if we dont have a book collection, one will be created;
//mongoose will put an S at the end BOOKS (our collection)
var Book = mongoose.model('Book', bookSchema);

//step4: export our model so we can use it;
module.exports = Book;

//
