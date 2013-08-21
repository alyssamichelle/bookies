bookies.controller('loginController', ['$rootScope', '$scope', 'firebaseCollection', 'angularFireAuth', function ($rootScope, $scope, firebaseCollection,angularFireAuth){
$scope.loginButtonDisplay = "Log In";
$scope.userArray = firebaseCollection('Users');

  $scope.log_user = function(){
    angularFireAuth.login('facebook');
    $scope.loginButtonDisplay = "Log Out";

    angularFireAuth.login('facebook').then(function(){
      // On fb login success then run through db & check 
      // if user with that fb user id does not exists
      var user = $scope.userArray.getByKey('id',$rootScope.user.id);
      if(!user){
        $rootScope.current_user_id = $scope.userArray.add({
          birthday: $rootScope.user.birthday,
          email: $rootScope.user.email, 
          first_name: $rootScope.user.first_name,
          last_name: $rootScope.user.last_name,
          user_name: $rootScope.user.displayName,
          facebook_id: $rootScope.user.id
        }).name();
      }else{
        $rootScope.current_user_id = user.$id;
      }

    },function(){
        console.log('There was an error with logging in with facebook.')
    }) ;

  };

  $scope.logout = function(){
    angularFireAuth.logout();
  };

}]);
