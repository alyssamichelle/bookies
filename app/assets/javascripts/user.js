bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', '$location', '$route', function ($rootScope, $scope, angularFire, angularFireAuth, $location, $route){
  $scope.$route = $route;
  
  $scope.logIn = function(){
    $scope.user.password = $scope.user.pw_a + $scope.user.pw_b + $scope.user.pw_c + $scope.user.pw_d;

    // password provider
    angularFireAuth.login('password', $scope.user).then(function(){
      userInfoCreation($scope.user);
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
    // console.log($scope.user.email, $scope.user.password, $rootScope.userInfo);
    // First we are creating a user with angularFireAuth who either returns a user object or an error
    angularFireAuth.createUser($scope.user.email, $scope.user.password, function(err, user){
      //can I just set the user that I receive back to $scope.user ?
      if(user){
        userInfoCreation(user);
      }else{
      console.log('Error : ', err);
      }
    });
  };

  var userInfoCreation = function(user){
    $rootScope.userInfo = {};
    var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
    angularFire(userRef, $rootScope, 'userInfo').then(function(){
      if($rootScope.userInfo.length == 0 || $rootScope.userInfo.length == undefined){
        // for sign up - we already have the info in root scope bc they entered it on the form
        $rootScope.userInfo.email = $scope.user.email;
        $rootScope.userInfo.first_name = $scope.user.first_name;
        $rootScope.userInfo.last_name = $scope.user.last_name;
        $rootScope.userInfo.password = $scope.user.password;
      }
      $location.path("/schedule");
    });
  }

  $scope.$on("angularFireAuth:login", function(evt, user) {
    // console.log(evt);
    // console.log(user);
    notificationInformation = {
      title: user.email + ' Logged In.',
      text: evt.name
    }
    notification(notificationInformation);
    // if rootscope.userInfo already exists dont create it again
    
    // var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
    // $rootScope.userInfo = {};
    // angularFire(userRef, $rootScope, 'userInfo').then(function(){});

  });

  var notification =  function(notificationInformation){

    $.pnotify({
      title: notificationInformation.title || 'Congratulations',
      text: notificationInformation.text  || 'You\'ve won!',
      type: notificationInformation.type  || 'success',
      icon: notificationInformation.icon || 'vampire'
    });
  };

  $scope.slabTextIfy = function(){
    setTimeout(function() {
      $('.slab').slabText().css({'text-transform' : 'uppercase'});
    }, 0);
    return true;
  };
}]);
