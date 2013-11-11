bookies.controller('schedulePrintController', ['$rootScope','$scope', 'angularFire', '$route', 'notify', '$location','$timeout', '$routeParams', function ($rootScope, $scope, angularFire, $route, notify, $location,$timeout, $routeParams){
  $scope.$route = $route;

  gatherPrintInfo($routeParams.currentDay);

  console.log(days);
  var month = days;
  $rootScope.userShiftArray = [];
  var keys = Object.keys(days);
  console.log('keys',keys);

  // for shifts in the month loop
  for (var i = 0; i < keys.length; i++) {
    // for users in shifts loop
    var shifts = month[keys[i]].shifts;
    console.log('shifts',shifts);

    for (var a = 0; a < shifts.length; a++) {
      var user_ids = Object.keys(shifts[a].user_ids);
      console.log('user_ids',user_ids);

      for (var b = 0; b < user_ids.length; b++) {
        //check if our current user is in them
        if(user_ids[b] == $rootScope.firebaseUser.id){
          $rootScope.userShiftArray.push(shifts[a]);
          console.log($scope.userShiftArray);
        }
      };
    };
  };

}]);
