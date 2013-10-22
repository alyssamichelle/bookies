bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', '$location', function ($rootScope, $scope, angularFire,angularFireAuth, $location){
  $scope.logIn = function(){

    // password provider
    angularFireAuth.login('password').then(function(user){
      $location.path("/schedule");
    },function(){
      console.log('Oh Bother, something has gone terribly wrong with sign up. Please try again.');
    });

    // facebook provider
    angularFireAuth.login('facebook').then(function(user){
    //call pin creator fn
      $location.path("/schedule");
    },function(){
        console.log('There was an error logging in with facebook.')
    });

  };

  bookiesPinGenerator = function(){
    $scope.user.password = Math.floor((Math.random()*9999)+1000);
    return $scope.user.password;
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
    $scope.user = userInfo || {};

    $scope.user.password = Math.floor((Math.random()*9999)+1000).toString();
  
    angularFireAuth.createUser($scope.user.email, $scope.user.password, function(err, user){
      // if(user) $location.path("#/schedule");
      console.log('something : ', err);
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

    var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
    $rootScope.userInfo = {};
    angularFire(userRef, $rootScope, 'userInfo').then(function(){
      if ($rootScope.userInfo.length == 0 || $rootScope.userInfo.length == undefined){
      // $rootScope.userInfo = $rootScope.user;
      $rootScope.userInfo.birthday = $rootScope.user.birthday;
      $rootScope.userInfo.email = $rootScope.user.email;
      $rootScope.userInfo.first_name = $rootScope.user.first_name;
      $rootScope.userInfo.last_name = $rootScope.user.last_name;
      $rootScope.userInfo.user_name = $rootScope.user.username;
      }
    });

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
