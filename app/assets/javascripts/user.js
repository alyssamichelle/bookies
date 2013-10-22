bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', '$location', function ($rootScope, $scope, angularFire, angularFireAuth, $location){
  $scope.logIn = function(){

    // password provider
    angularFireAuth.login('password').then(function(user){
      $location.path("/schedule");
    },function(){
      console.log('Oh Bother, something has gone terribly wrong with sign up. Please try again.');
    });
  };

  $scope.logOut = function(){
    angularFireAuth.logout();
  };

  $scope.$on('angularFireAuth:logout', function(evt){
    $location.path("/logIn");
  });

  // console.log('angularFireAuth.createUser :', angularFireAuth.createUser());
  $scope.createUser = function(){
    //call pin creator fn
    var parsedPassword = $scope.user.password.a + $scope.user.password.b + $scope.user.password.c + $scope.user.password.d;
    console.log($scope.user.email, parsedPassword);

    angularFireAuth.createUser($scope.user.email, parsedPassword, function(err, user){
      if(user){
        var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
        $rootScope.userInfo = {};
        angularFire(userRef, $rootScope, 'userInfo').then(function(){
          if ($rootScope.userInfo.length == 0 || $rootScope.userInfo.length == undefined){
            $rootScope.userInfo.email = $scope.user.email;
            $rootScope.userInfo.first_name = $scope.user.first_name;
            $rootScope.userInfo.last_name = $scope.user.last_name;
          }
        });
        $location.path("#/schedule")
      }else{
      console.log('something : ', err);
      }
    });

  };

  $scope.$on("angularFireAuth:login", function(evt, user) {
    console.log(evt);
    console.log(user);
    notificationInformation = {
      title: user.name + ' Logged In.',
      text: evt.name
    }
    notification(notificationInformation);
    // if rootscope.userInfo already exists dont create it again
    var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
    $rootScope.userInfo = {};
    angularFire(userRef, $rootScope, 'userInfo').then(function(){});

  });

  var notification =  function(notificationInformation){

    $.pnotify({
      title: notificationInformation.title || 'Congratulations',
      text: notificationInformation.text  || 'You\'ve won!',
      type: notificationInformation.type  || 'success',
      icon: notificationInformation.icon || 'vampire'
    });
  };

}]);
