
//Factory Also known as service used to hold the information
app.factory('posts',[function(){
  var o = {
    posts:[]
  };
  o.getAll = function () { // Retrieves posts in the posts service
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts); // Creates deep copy of the returned data
    });                            //and ensures $scope.posts variable in MainCtrl are also updated.
  };
  return o;
}]);