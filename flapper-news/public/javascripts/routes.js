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
                  controller: 'MainCtrl',
                  resolve: { // Resolve is used because anytime home state is entered, it queries for all posts
                      postPromise: ['posts' , function(posts){ // from the backend before the state finished loading.
                          return posts.getAll();
                      }]
                  }
                })
    // The {id} is a route parameter that will be available to the controller
                .state('posts', {
                  url: '/posts/{id}', 
                  templateUrl: '/posts.html',
                  controller: 'PostsCtrl',
                  resolve: { // Queries for the full post object including comments
                      post: [ '$stateParams', 'posts', function($stateParams, posts) {
                          return posts.get($stateParams.id);
                      }]
                    }
                });                      

      $urlRouterProvider.otherwise('home');
}]);