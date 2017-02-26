
//Factory Also known as service used to hold the information
app.factory('posts',['$http', function($http){
  var o = {
    posts:[]
  };
  o.getAll = function () { // Retrieves posts in the posts service
    return $http.get('/posts').success(function(data){ //Angualar $http service used to query posts route
      angular.copy(data, o.posts); // Creates deep copy of the returned data
    });                            //and ensures $scope.posts variable in MainCtrl are also updated.
  };
  o.create = function(post) { //For creating new posts
      return $http.post('/posts', post).success(function(data){
          o.posts.push(data);
      });
  }
  o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote').success(function(data){ // MongoDB uses the _id property                       
            post.upvotes += 1;        // natively so it's easier to just write out app with that in mind 
        });                          // rather than have to translate it to an id field.
  };
  o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res){
          return res.data;
      });
  };
  o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment)
  };
  o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data){
          comment.upvotes += 1;
      });
  };

  return o;
}]);