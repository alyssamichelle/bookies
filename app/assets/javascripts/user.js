bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', '$location', '$route', function ($rootScope, $scope, angularFire, angularFireAuth, $location, $route){
  $scope.$route = $route;
  
  $scope.logIn = function(){
    $scope.user.password = $scope.user.pw_a + $scope.user.pw_b + $scope.user.pw_c + $scope.user.pw_d;
    angularFireAuth.login('password', $scope.user).then(function(){
    },function(err){
      console.log('Oh Bother, something has gone terribly wrong with sign up. Please try again.', err);
    });
  };

  $scope.logOut = function(){
    angularFireAuth.logout();
  };

  $scope.$on('angularFireAuth:logout', function(evt){
    $location.path("/logIn");
  });

  $scope.createUser = function(){
    $scope.user.password = $scope.user.pw_a + $scope.user.pw_b + $scope.user.pw_c + $scope.user.pw_d;
    // Creating a user with angularFireAuth who either returns a user object or an error
    angularFireAuth.createUser($scope.user.email, $scope.user.password, function(err, user){
      if(user){
        $rootScope.userInfo = {};
        var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + $rootScope.firebaseUser.id );
        angularFire(userRef, $rootScope, 'userInfo').then(function(){
          $rootScope.userInfo.email = $scope.user.email;
          $rootScope.userInfo.first_name = $scope.user.first_name;
          $rootScope.userInfo.last_name = $scope.user.last_name;
          $rootScope.userInfo.password = $scope.user.password;
        });
      }else{
      console.log('Error : ', err);
      }
    });
  };

  $scope.slabTextIfy = function(){
    setTimeout(function() {
      $('.slab').slabText().css({'text-transform' : 'uppercase'});
    }, 0);
    return true;
  };


}]);
