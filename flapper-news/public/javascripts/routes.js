// Angular State Routing
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