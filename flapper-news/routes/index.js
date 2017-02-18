var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Our code from here on
var mongoose = require('mongoose'); // Make sure mongoose is imported
var Post = mongoose.model('Post'); // Get Handles to Post and Comment models
var Comment = mongoose.model('Comment');


// Request object to handle requests (req:contains info). Represents HTTP request
// Response object (res:respond to client). HTTP response that an Express app sends when it gets request
// Next is a function in the Express router which executes middleware succeeding current middleware when invoked

/* REST Routes */
// Creating GET route for retrieving posts, returns JSON list containing all posts
// Use express get()  method to define URL for route (/posts)
router.get('/posts', function(req, res, next) { 
  Post.find(function(err, posts){  // Query database for all posts
    if(err){ return next(err); } // Pass error to error-handling function

    res.json(posts); // Send retrieved posts back to client
  });
});

// Creating a POST route for creating a new post
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post) {
    if(err){ return next(err); };
    
    res.json(post);
  });
});

// Code below maps logic to route parameter 'post'
// Creating route for preloading post objects in routes/index.js
// When defining a route URL with :post in it, this function will run first assuming :post param contains an ID
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) { //Retrieve post object from database
    if(err) { return next(err); }
    if(!post) { return next(new Error('can\'t find post')); }

    req.post = post; // Attach it to the request object after which the route handler function will be called
    return next();
  });
});

// Route for returning a single post
router.get('/posts/:post', function(req, res) {
  req.post.populate('comments', function(err, post) { // populate() allows comments to be retrieved with posts
    if (err) { return next(err); }
    
    res.json(req.post);
  });
});

// Route for the upvote method in /models/Posts.js
router.put('/posts/:post/upvote', function (req, res, next){
  req.post.upvote(function(err, post) {
    if (err) {return next(err); }

    res.json(post);
  });
});

/* Routes for comments */

// Route for creating a new comment
router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post; // Request already includes the post ID

  comment.save(function(err, comment){ 
    if(err){ return next(err); }

    req.post.comments.push(comment); // Reference to new comment from the post
    req.post.save(function(err, post) {
      if(err){ return next(err); }
      
      res.json(comment);
    });
  });
});

// Route for the upvote method in /models/Comments.js
router.put('/posts/:post/comments/:comment/upvote', function (req, res, next){
  req.comment.upvote(function(err, comment) {
    if (err) {return next(err); }

    res.json(comment);
  });
});

// Code below maps logic to route parameter 'comment'
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment) { //Retrieve comment object from database
    if(err) { return next(err); }
    if(!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment; // Attach it to the request object after which the route handler function will be called
    return next();
  });
});