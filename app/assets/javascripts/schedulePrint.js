bookies.controller('schedulePrintController', ['$rootScope','$scope', 'angularFire', '$route', 'notify', '$location','$timeout', '$routeParams', function ($rootScope, $scope, angularFire, $route, notify, $location,$timeout, $routeParams){
  $scope.$route = $route;
  if($routeParams){
  }else{
    $routeParams.currentDay = "2014-01-01";
  }
  var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/' + $routeParams.currentDay);
  $scope.month = {};
  angularFire(ref, $scope, 'month').then(function(dis){
    dis();
    $rootScope.userShiftArray = [];
    var keys = Object.keys($scope.month.days);

    // for shifts in the month loop
    for (var i = 0; i < keys.length; i++) {
      // for users in shifts loop
      var shifts = $scope.month.days[keys[i]].shifts;

      for (var a = 0; a < shifts.length; a++) {
        if(shifts[a].user_ids){
          var user_ids = Object.keys(shifts[a].user_ids);

          for (var b = 0; b < user_ids.length; b++) {
            //check if our current user is in them
            console.log('user_ids[b]', user_ids[b],$rootScope.firebaseUser.id);
            if(user_ids[b] == $rootScope.firebaseUser.id){
              shifts[a].date = keys[i];
              console.log('shifts[a]',shifts[a]);
              $rootScope.userShiftArray.push(shifts[a]);
              console.log($scope.userShiftArray);
            }
          };
        };
      };
    };
  })

}]);
