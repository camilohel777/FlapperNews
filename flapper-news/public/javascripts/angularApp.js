var app = angular.module('flapperNews',['ui.router']);
// Using ui.router to allow the app to work in a SPA (single-page application)

// Change url based on state(like a state machine)
// Configuring our ui-router. $stateProvider and $urlRouterProvider used to set up home router and home state
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider)
  {
    $stateProvider // :
    // States and their nested views
                  .state('home', {
                  url: '/home',
                  templateUrl: '/home.html',
                  controller: 'MainCtrl'
                })
    // The {id} is a route parameter that will be available to the controller
                .state('posts', {
                  url: '/posts/{id}',
                  templateUrl: '/posts.html',
                  controller: 'PostsCtrl'
                });

      $urlRouterProvider.otherwise('home');
}]);

//Factory Also known as service used to hold the information
app.factory('posts',[function(){
  var o = {
    posts:[]
  };
  return o;
}]);

app.controller('MainCtrl', [ '$scope', 'posts',
function($scope, posts)
{
  $scope.posts = posts.posts;
  $scope.addPost = function()
  {
    if(!$scope.title || $scope.title === '')
    {
      return;
    }
    $scope.posts.push(
      {
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool Post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    });
    $scope.title = '';
    $scope.link = '';
  }
  $scope.incrementUpvotes = function (post)
  {
    post.upvotes += 1;
  }
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts)
  {
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function()
    {
      if($scope.body === '')
      {
        return;
      }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
    $scope.incrementUpvotes = function (comment)
    {
        comment.upvotes += 1;
    }
  }]);
