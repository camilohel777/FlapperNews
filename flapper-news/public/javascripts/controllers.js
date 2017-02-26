// Angular controllers

app.controller('MainCtrl', [ '$scope', 'posts',
function($scope, posts)
{
  $scope.posts = posts.posts;
  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({ //Now saves posts to the server
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  }
  $scope.incrementUpvotes = function (post) {
    posts.upvote(post);
  }
}]);

app.controller('PostsCtrl', [
  '$scope',
  'posts',
  'post',
  function($scope, posts, post) {
    $scope.post = post;

    $scope.addComment = function(){
      if($scope.body === ''){ return; }
      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    }
    $scope.incrementUpvotes = function(comment){
        posts.upvoteComment(post, comment);
    };
  }]);