bookies.controller('userController', ['$rootScope', '$scope', 'angularFire', 'angularFireAuth', '$location', '$route', function ($rootScope, $scope, angularFire, angularFireAuth, $location, $route){
  $scope.$route = $route;
  
  $scope.logIn = function(){
    $('.log-in-button').attr('disabled', true);
    $scope.bookiesUser.password = $scope.bookiesUser.pw_a + $scope.bookiesUser.pw_b + $scope.bookiesUser.pw_c + $scope.bookiesUser.pw_d;
    angularFireAuth.login('password', $scope.bookiesUser).then(function(){
    },function(err){
      $('.log-in-button').removeAttr('disabled');
      alert('Oh Bother, something has gone terribly wrong. Please try again.', err);
    });
  };

  $scope.logOut = function(){
    angularFireAuth.logout();
  };

  $scope.$on('angularFireAuth:logout', function(evt){
    $location.path("/logIn");
  });

  $scope.createUser = function(){
    $('.sign-up-button').attr('disabled', true);
    $scope.bookiesUser.password = $scope.bookiesUser.pw_a + $scope.bookiesUser.pw_b + $scope.bookiesUser.pw_c + $scope.bookiesUser.pw_d;
    // Creating a user with angularFireAuth who either returns a user object or an error

    angularFireAuth.createUser($scope.bookiesUser.email, $scope.bookiesUser.password, function(err, user){
      console.log('err',err);

      if(user){
        $scope.angularFireUser = {};
        var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + user.id );
        angularFire(userRef, $scope, 'angularFireUser').then(function(){
          $scope.angularFireUser = {
            email     : $scope.bookiesUser.email,
            first_name: $scope.bookiesUser.first_name,
            last_name : $scope.bookiesUser.last_name,
            password  : $scope.bookiesUser.password
          }
        });
      }else{
        $('.sign-up-button').removeAttr('disabled');
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

  $scope.focusNextInput = function(event){
    var $input = $(event.target);
    if(event.keyCode == 8){
      if ($input.val() == '') {
        $input.prev().focus();
      }
    } else {
      if ($input.next().length > 0) {
        $input.next().focus();
      }
    }
  };

}]);
