bookies.controller('scheduleController', ['$rootScope','$scope', 'firebaseCollection', 'angularFire', function ($rootScope,$scope, firebaseCollection, angularFire){
  var date = Date.create('september 2013');
  var when = date.format('{MM}-{yyyy}');
  var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/' + when);

  // if above when(month/year) does not exist
  // try loading the previous month(only back 6 month ago though)

  angularFire(ref, $scope, 'schedule');
  // $scope.currentUserId = $rootScope.user.id;
  // console.log('current user id : :', $scope.currentUserId);
  $scope.currentDay = parseInt(Date.create('today').rewind({day : 5}).format('{d}'));

  setTimeout(function(){
    console.log('schedule : :', $scope.schedule); 
    var currentMonth = $scope.schedule.startOfMonth;
  }, 2000);

  $scope.shiftStuffing = function(day_index, shift_index, id, first_name, last_name) {
    console.log('id', id)
    var user_ids = function()
    {
      // TODO: Fix this someday
      // He re be Dragons.
      $scope.schedule.days[day_index].shifts[shift_index].user_ids = $scope.schedule.days[day_index].shifts[shift_index].user_ids || {};
      $scope.schedule.days[day_index].shifts[shift_index].user_ids[id] = $scope.schedule.days[day_index].shifts[shift_index].user_ids[id] || {};
      return $scope.schedule.days[day_index].shifts[shift_index].user_ids[id];
    }
    var taken = function(change)
    {
      $scope.schedule.days[day_index].shifts[shift_index].taken = $scope.schedule.days[day_index].shifts[shift_index].taken || 0;
      $scope.schedule.days[day_index].shifts[shift_index].taken += change;

    }
    
    if (user_ids().status == 'inactive') {
      taken(-1);
      delete  $scope.schedule.days[day_index].shifts[shift_index].user_ids[id];
    } else {
      taken(1);
      user_ids().status = 'inactive';
      user_ids().name = first_name + ' ' + last_name;
    }

  };
}]);
