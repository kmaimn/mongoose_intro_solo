//create and define queries;

var express = require('express');
var router = express.Router();
var Book = require('../models/book');

// GET /books - return all books from database
router.get('/', function (req, res) {
  //first param is the document; empty object - means find everything, annoyn function
  //books is a placeholder for data;
  Book.find({}, function (err, books) {
    //mongoose manages connctions, dont need to done;
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(books);
  });
});
// POST /books - add a new books to the database

router.post('/', function (req, res) {
  console.log('POST', req.body);
  //created a book var that conforms to our book model;
  //using the book model to create the type book and then we can call save on it; simliar to the above book model where we called a function on it;
  var book = Book(req.body);
  //because we did above, we can do .save it: save it after we've done whatever to it;
  //function on a document;
  //book is a document because we passed it through our model;
  book.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});
//PUT /books/<id> - update a books with the given id;

router.put('/:id', function (req, res) {
  //not making it a document, just holding on to the data;
  //will override the entire object;
  var book = req.body;
  var id = req.params.id;
  //a query on book model; first find the book and then update it; first param: ID to find book, data we want to use to update it (located in req.body), annon funct)
  //book return in below function is from mongodb
  Book.findByIdAndUpdate(id, book, function (err, book) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    //204 means something like OK
    //can also send the book itself back (with updates)
    res.status(204).send(book);
  });
});
/**
 * DELETE /movies/<id>
 *
 * delete a movie with the given id
 */
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  //takes and ID, annon function
  //takes the ID of the book and tries to delete it;
  Book.findByIdAndRemove(id, function (err) {
    if (err){
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});

//comments route:
router.post('/:id/comments', function (req, res){
  //book id;
  var id = req.params.id;
  //data we are sending;
  var comment = req.body;

  Book.findById(id, function (err, book){
    if (err){
      res.sendStatus(500);
      return;
    }
    //comments is a prop on books (comments is an array)
    book.comments.push(comment);
    book.save(function (err){
      if (err){
        console.log('error:', err)
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
