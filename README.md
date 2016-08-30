# Omicron Mongoose Lecture

An overview for today's Mongoose lecture.

We are starting with an application that will run and serve our
index page with `npm start`. But, that's really all we have.

We will complete this application using Angular and Mongoose.

## Agenda

1. Connect to Mongo using [Mongoose](http://mongoosejs.com/), a node module.
2. Create base GET, POST, PUT, and DELETE server-side routes.
3. Implement the Mongoose syntax needed to support the above routes.
4. Use Angular to add, display, update and delete books.
5. Implement ability to add comments by modifying the view and client-side logic.
6. Complete comments functionality on the server by using Mongoose subdocument.
7. Implement a pre-save hook to filter profanity from our comments.

## New Terms

* Mongoose schema
* Mongoose model
* Mongoose subdocument
* Hook

## New Syntax

Quick rundown of new syntax we will use to query our database using Mongoose.

### Mongoose Model Functions

* `find`
* `findById`
* `findByIdAndUpdate`
* `findByIdAndRemove`

### Mongoose Document Functions

* `save`

### Mongoose Schema Functions

* `pre`
