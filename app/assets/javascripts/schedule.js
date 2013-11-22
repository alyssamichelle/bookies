bookies.controller('scheduleController', ['$rootScope','$scope', 'angularFire', '$route', 'notify', '$location','$timeout', '$routeParams', function ($rootScope, $scope, angularFire, $route, notify, $location,$timeout, $routeParams){
  $scope.$route = $route;
  var id = first_name = last_name = '';
  $scope.Date = Date;
  $scope.Object = Object;
  var monthModifier;

  $(window).on('resize', function(){
    resize();
  });

  var resize = function() {
    setTimeout(function() {
      var width = $('div.shift div').width();
      $('div.shift div').css({'height': width})
    }, 1000);
  };resize();

  $scope.$watch("schedule", function(){
    resize();
    console.log('watch is being called');
  });

  var firebaseCall = function(){
    // Getting the FireBase Schedule For the displaying month //
    var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/' + $scope.currentSelector);
    if ($scope.unbindSchedule) {
      $scope.unbindSchedule()
    }
    $scope.schedule = {};
    angularFire(ref, $scope, 'schedule').then(function(dis){
      $scope.unbindSchedule = dis;
      // resize();
    }, function(){
      console.log('There was an error when trying to get the months information.');
    });
  }; 

  $scope.currentSelector;
  var setMonth = function() {
    var keyRef = new Firebase('https://anicoll-livechat.firebaseio.com/ScheduleKeys/');
    angularFire(keyRef, $scope, 'scheduleKeys').then(function() {
      monthModifier = monthModifier || $scope.scheduleKeys.length - 1;
      $scope.currentSelector = $scope.scheduleKeys[monthModifier];
      firebaseCall();
    });
  }; setMonth();

  var getUserInfo = function(){
    id = $rootScope.firebaseUser.id;
    first_name = $rootScope.userInfo.first_name;
    last_name = $rootScope.userInfo.last_name;
  };

  $scope.shiftStuffing = function(currentDay, shift_index, status) {
    // console.log('status', status)
    if(status == 'inactive'){        
      var notifyInfo = {
        title: 'Already Signed Up For That Shift',
        text: 'so sorry',
        icon: 'skull'
      }
      notify(notifyInfo);
      return;
    }else{

      getUserInfo();
      var day = Date.create(currentDay.date).format('{MM}-{dd}');
      // console.log('$scope.schedule.days', $scope.schedule.days);
      // console.log('currentDay', currentDay);
      // $scope...user_ids = itself or {}
      $scope.schedule.days[day].shifts[shift_index].user_ids = $scope.schedule.days[day].shifts[shift_index].user_ids || {};
      // $scope...user_ids[id] = itself or {}
      $scope.schedule.days[day].shifts[shift_index].user_ids[id] = $scope.schedule.days[day].shifts[shift_index].user_ids[id] || {};
      // Adding a status and name to the user_id[id] for easy access to those two pieces of information
      $scope.schedule.days[day].shifts[shift_index].user_ids[id].status = 'inactive';
      $scope.schedule.days[day].shifts[shift_index].user_ids[id].name = first_name + ' ' + last_name;
      // Returning the user_ids[id] array we just added to (or newly created)
      // TO-DO : Does this need to be returned ??
      return $scope.schedule.days[day].shifts[shift_index].user_ids[id];
    };
  };

  // La Methods Of Awesome //
  $scope.previous = function(){
    monthModifier--;
    $scope.currentSelector = $scope.scheduleKeys[monthModifier];
    firebaseCall();
  };

  $scope.next = function(){
    monthModifier++;
    $scope.currentSelector = $scope.scheduleKeys[monthModifier];
    firebaseCall();
  };

  $scope.current = function(){
    //make this go to current day
  };

  $scope.getNumber = function(num) {
    var intNum = parseInt(num, 10);
    array = new Array(intNum);
    // this is bc it would not let us repeat on an array with duplicate values
    // angular error on ng-repeat version 1.2.0-rc.3 (did not exist in 1.0.8)
    for (var i = 0; i < intNum; i++) {
      array[i] = i;
    }
    return array;
  };

  $scope.isCurrentMonth = function(day){
    return Date.create(day).format('{MM}-{YYYY}') === $scope.today.format('{MM}-{YYYY}');
  };

  $scope.createClaimButtons = function(shift, index){
    if(typeof shift.user_ids === 'undefined') shift.user_ids = {};
    if(typeof shift.available === 'undefined') shift.available = 0;
    var claimButtonNeeded = (shift.available - Object.keys(shift.user_ids).length) >= (index + 1);
    return claimButtonNeeded;
  };

  $scope.dropShiftOption = function(day, shift, userId){
    console.log('day',day);
    console.log('shift',shift);
    console.log('userId',userId);
      var notice = $.pnotify({
        title: 'Are you sure you want to drop the ' + day.shifts[shift].name + ' shift for ' + day.date + '?',
        text: '<a class="confirm-button" ng-click = "dropShift()">Sure thing</a>',
        styling: 'jqueryui',
        icon: false,
        width: 'auto',
        hide: false,
        sticker: false,
        insert_brs: false,
      });    

    notice.find('.confirm-button').on('click', function() {
      $.pnotify_remove_all();
      $scope.dropShift(day, shift, userId);

      return false;
    });
  };

  $scope.dropShift = function(day, shift, userId){
    console.log('dropShift');
    // TODO: Call for normal users.
    // Check to see if current user exists in the day's shift's user_ids array.
    // getUserInfo();

    // Admin functionality
    // TODO: Figure out why changes to $scope.schedule aren't syncing to the world

    console.log('day :', day);
    $timeout(function()
    {
      
      day = Date.create(day.date).format('{MM}-{dd}');
      console.log('day :', shift);
      console.log(0, $scope.schedule.days[day].shifts[shift].user_ids[userId]);
      delete $scope.schedule.days[day].shifts[shift].user_ids[userId];
      console.log(1, $scope.schedule.days[day].shifts[shift].user_ids[userId]);
    });
    
  };

  // if($routeParams.currentDay)
  // {
  //    gatherPrintInfo($routeParams.currentDay);
  // }

  // var gatherPrintInfo = function(days){
  //   console.log('days', days);
  //   var month = days;
  //   $rootScope.userShiftArray = [];
  //   var keys = Object.keys(days);
  //   console.log('keys',keys);

  //   // for shifts in the month loop
  //   for (var i = 0; i < keys.length; i++) {
  //     // for users in shifts loop
  //     var shifts = month[keys[i]].shifts;
  //     console.log('shifts',shifts);

  //     for (var a = 0; a < shifts.length; a++) {
  //       var user_ids = Object.keys(shifts[a].user_ids);
  //       console.log('user_ids',user_ids);

  //       for (var b = 0; b < user_ids.length; b++) {
  //         //check if our current user is in them
  //         if(user_ids[b] == $rootScope.firebaseUser.id){
  //           $rootScope.userShiftArray.push(shifts[a]);
  //           console.log($scope.userShiftArray);
  //         }
  //       };
  //     };
  //   };

  // };

}]);
