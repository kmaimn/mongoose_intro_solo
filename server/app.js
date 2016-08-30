/** ---------- THIRD PARTY MODULES ---------- **/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/** ---------- OUR MODULES ---------- **/
var books = require('./routes/books');
var index = require('./routes/index');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json()); // needed for angular requests

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/books', books);
app.use('/', index);
/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
//this is connecting to our database, doens't necessarily have to be created yet; will create for you if its not there;
var databaseUri = 'mongodb://localhost:27017/omicron';

//connecting to mongodb - this is the only time we have to call this;
mongoose.connect(databaseUri);

//looking for an event - that we are connected to the db;
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ', databaseUri);
});

//looking for an error, respond back with error meesage;
mongoose.connection.on('error', function (err) {
  console.log('Mongoose failed to connect because error: ', err);
});

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port', app.get('port'));
});
