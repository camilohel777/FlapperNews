var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Creating GET route for retrieving posts, returns JSON list containing all posts
var mongoose = require('mongoose'); // Make sure mongoose is imported
var Post = mongoose.model('Post'); // Get Handles to Post and Comment models
var Comment = mongoose.model('Comment');

// Use express get()  ethod to define URL for route (/posts)
router.get('/posts', function(req, res, next) { // Function to handle requests (req :contains info)(res: respond to client)
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