bookies.controller('loginController', ['$rootScope', '$scope', 'firebaseCollection', 'angularFireAuth', function ($rootScope, $scope, firebaseCollection,angularFireAuth){
$scope.loginButtonDisplay = "Log In";
var userArray = firebaseCollection('Users');

//get log out working

  $scope.log_user = function(){
    if (angularFireAuth._authenticated) {
      angularFireAuth.logout();
      $scope.loginButtonDisplay = "Log In";
    } else {
      angularFireAuth.login('facebook').then(function(){
      },function(){
          console.log('There was an error with logging in with facebook.')
      });
    }
  };

  $scope.$on("angularFireAuth:login", function(evt, user) {
    $scope.loginButtonDisplay = "Log Out";

    // On fb login success then run through db & check 
    // if user with that fb user id does not exists
    userArray.then(function(theRealUserArray) {
      // Figure out where a promise is already att and use it to do .done()
      //  Result : this block is only called after user exists
      var user = theRealUserArray.getByKey('id', $rootScope.user.id);
      console.log(user);
      if(!user){
        var user_obj = {};
        if($rootScope.user.birthday) user_obj.birthday = $rootScope.user.birthday;
        if($rootScope.user.email) user_obj.email = $rootScope.user.email;
        if($rootScope.user.first_name) user_obj.first_name = $rootScope.user.first_name;
        if($rootScope.user.last_name) user_obj.last_name = $rootScope.user.last_name;
        if($rootScope.user.user_name) user_obj.user_name = $rootScope.user.user_name;
        if($rootScope.user.id) user_obj.id = $rootScope.user.id;
      
        $rootScope.current_user_id = theRealUserArray.add(user_obj).name();
      }else{
        $rootScope.current_user_id = user.$id;
      }
    }, 100);
  });

}]);
