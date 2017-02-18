var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var mongoose = require('mongoose'); // Make sure mongoose is imported
var Post = mongoose.model('Post'); // Get Handles to Post and Comment models
var Comment = mongoose.model('Comment');

// Creating GET route for retrieving posts, returns JSON list containing all posts
// Use express get()  method to define URL for route (/posts)
router.get('/posts', function(req, res, next) { // Function to handle requests (req:contains info)(res:respond to client)
  Post.find(function(err, posts){  // Query database for all posts
    if(err){ return next(err); } // Pass error to error-handling function

    res.json(posts); // Send retrieved posts back to client
  });
});

// Creating a POST route for creating posts
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post)
  {
    if(err){ return next(err); };
    
    res.json(post);
  });
});

// Creating route for preloading post objects in routes/index.js
// When defining a route URL with :post in it, this function will run first assuming :post param contains an ID
router.param('post', function(req,res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) { //Retrieve post object from database
    if(err) { return next(err); }
    if(!post) { return next(new Error('can\'t find post')); }

    req.post = post; // Attach it to the req object after which the route handler function will be called
    return next();
  });

});

// Route for returning a single post
router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});