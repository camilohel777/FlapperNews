var app = angular.module('flapperNews',['ui.router']);
// Using ui.router to allow the app to work in a SPA (single-page application)

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
  $scope.test = 'Hello World';
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
      upvotes: 0
    });

    $scope.title = '';
    $scope.link = '';
    $scope.incrementUpvotes = function (post){
      post.upvotes += 1;
    };
  };
}]);

// Change url based on state(like a state machine)
// Configuring our ui-router. $stateProvider and $urlRouterProvider used to set up home router and home state
app.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider)
  {
    $stateProvider.state('home', {
                  url: '/home',
                  templateUrl: '/home.html',
                  controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);
