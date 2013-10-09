bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', function ($rootScope, $scope, angularFire,angularFireAuth){
  $scope.loginButtonDisplay = "Log In";

  $scope.log_user = function(){
    if (angularFireAuth._authenticated){
      angularFireAuth.logout();
      $scope.loginButtonDisplay = "Log In";
    } else {
      angularFireAuth.login('password').then(function(user){
        console.log('user : :',user);
      },function(){
        console.log('Oh Bother, something has gone terribly wrong with sign up. Please try again.')
      });

      angularFireAuth.login('facebook').then(function(user){
        console.log('user : :',user);
      },function(){
          console.log('There was an error with logging in with facebook.')
      });
    }
  };

  $scope.$on("angularFireAuth:login", function(evt, user) {
    console.log(user.id);
    successNotification();
    $scope.loginButtonDisplay = "Log Out";
    var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
    $rootScope.userInfo = {};
    angularFire(ref, $rootScope, 'userInfo').then(function(){
      console.log($rootScope.userInfo, 'scope.userInfo.length')
      if ($rootScope.userInfo.length == 0 || $rootScope.userInfo.length == undefined){
        if(user.provider == "password"){
          // take sign up info here for normal login
        };
        if(user.provider == "facebook"){
          $rootScope.userInfo.birthday = $rootScope.user.birthday;
          $rootScope.userInfo.email = $rootScope.user.email;
          $rootScope.userInfo.first_name = $rootScope.user.first_name;
          $rootScope.userInfo.last_name = $rootScope.user.last_name;
          $rootScope.userInfo.user_name = $rootScope.user.username;
        }
      }
    });
  });

  var successNotification =  function(){
    $.pnotify({
      title: 'Success! You have logged In as : ' + user.name,
      text: 'Congratulations! You\'ve won!',
      type: 'success',
      icon: 'picon picon-flag-green'
    });
  };


}]);
