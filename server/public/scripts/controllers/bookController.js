//this represents the app that we have defined in the app.js file;
app.controller('bookController', ['$scope', '$http', function($scope, $http){
  // set empty array of books we expect from the db;
  $scope.books = [];

  //model for our form for a new book to be added to db;
  $scope.newBook = {};

  //this is will hold the ngclick to display info from a specific book;
  $scope.displayBookId = '';
  // array for new comment
  $scope.newComment = {};
  //update with books in database on load;
  getBooks();

//------------------------------//


//-----------------------------//
  //first section: scope functions; avail on the DOM
  //something to submit new book:
  $scope.submitNewBook = function () {
    //sending new information that is on $scope.newBook
    //set it to a new var to make it easier to type;
    var data = $scope.newBook;
    $http.post('/books', data)
      .then(function () {
      console.log('POST /books', data);
      //call function to re-get the books in the db after the change;
      getBooks();
    });
  };

  //delete
  //pass through a paramater to represent the ID of the book - so we know where to connect it on the otherside;
  $scope.deleteBook = function (id) {
    $http.delete('/books/' + id)
      .then(function () {
      console.log('DELETE /books/', id);
      //call function to re-get the books in the db after the change;
      getBooks();
    });
  };

  //take in the entire book object because it has the ID and the thing we want to change;
  $scope.updateBook = function (book) {
    //MG automatically sets it to _id, so we have to reference it that way;
    var id = book._id;

    $http.put('/books/' + id, book)
      .then(function () {
      console.log('PUT /books', id);
      //call function to re-get the books in the db after the change;
      getBooks();
    });
  };
  //take in book ID
  $scope.displayComments = function (id) {
    $scope.displayBookId = id;
  };

  $scope.submitComment = function (id) {
    var data = $scope.newComment;
    //creating a new route /books/id/comments that will handle posting of comments;
    $http.post('/books/' + id + '/comments', data)
    .then(function(){
      console.log('POST /books/', id, '/comments', data);
      $scope.newComment = {};
      getBooks();
    });
  };

  //second section: utility functions: called on other functions, not on scope, not avail to be called on DOM;

  function getBooks() {
    //get request
    $http.get('/books')
      .then(function (response) {
        console.log('GET /books', response.data);

        var bookDataArray = response.data;

        bookDataArray.forEach(function (book) {
          //we are passing a particular piece of data to a data object: forcing for it to be a js date object; with its current formatting, it doesn't recog as datate;
          book.publishDate = new Date(book.publishDate);
        });
      //setting empty array to response.data;
        $scope.books = bookDataArray;
      });
  }

}]);
