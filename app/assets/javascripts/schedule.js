bookies.controller('scheduleController', ['$rootScope','$scope', 'angularFire', '$route', function ($rootScope, $scope, angularFire, $route){
  $scope.$route = $route;
  
  var monthModifier = 0;
  var id = first_name = last_name = '';
  $scope.Date = Date;
  $scope.Object = Object;

  var monthBuilder = function(start){
    $scope.today = Date.create().addMonths(monthModifier)
    var start = $scope.today.clone().beginningOfMonth()
      , end   = $scope.today.clone().endOfMonth();

    $scope.month = $scope.today.format('{MM}');
    $scope.monthFull = $scope.today.format('{Month}');
    $scope.year = $scope.today.format('{yyyy}');

    // If the first day is not Sunday //
    var dayOfWeek = start.getDay()
    if (dayOfWeek !== 0) start.addDays(-dayOfWeek);

    // Get the weeks and loop through them //
    var weeksDateRange = Date.range(start, end).eachWeek();
    $scope.weeks = [];

    for (var i in weeksDateRange) {
      $scope.weeks[i] = [];
      start = Date.create(weeksDateRange[i]);
      end   = start.clone().endOfWeek();
      // console.log('WEEK', parseInt(i) + 1);

      // Get the days and loop through them
      var days = Date.range(start, end).eachDay();
      for (var ii in days) {
        var day = Date.create(days[ii]);
        $scope.weeks[i].push(Date.parse(day));
        // console.log(day.format('short'));
      }
    }
    firebaseCall();
  };

  var firebaseCall = function(){
    // Getting the FireBase Schedule For the displaying month //
    var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/' + $scope.month +'-' + $scope.year);
    // console.log('ref', ref);

    if ($scope.unbindSchedule) {
      $scope.unbindSchedule()
    }
    $scope.schedule = {};
    angularFire(ref, $scope, 'schedule').then(function(something){
      $scope.unbindSchedule = something;
      console.log('schedule', $scope.schedule, something);
    }, function(){
      console.log('There was an error when trying to get the months information.');
    });
  };

  monthBuilder();


  var getUserInfo = function(){
    id = $scope.user.id;
    first_name = $rootScope.userInfo.first_name;
    last_name = $rootScope.userInfo.last_name;
  };

  $scope.shiftStuffing = function(currentDay, shift_index, status) {
    // console.log('shift index', shift_index)
    if(status == 'inactive'){
      popUp();
      console.log('You are already signed up for this shift');
      return;
    }else{

      getUserInfo();
      var day = Date.create(currentDay).format('{d}');

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
    monthBuilder();
  };

  $scope.next = function(){
    monthModifier++;
    monthBuilder();
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
    // console.log(shift.available,Object.keys(shift.user_ids).length, index, claimButtonNeeded )
    return claimButtonNeeded;
  };

  $scope.popUp = function(day, shift){
    // console.log('day', day);
    // console.log('shift', shift);

    $scope.popUpMessage = {};
    $scope.popUpMessage.message = "Are You Sure You Want To Drop This Shift ?";
    $scope.popUpMessage.Agree = "Yes";
    $scope.popUpMessage.Disagree = "No";
    // console.log('hello', $scope.popUpMessage);

    return $scope.showPopUp = true;
  };

  $scope.closePopUp = function(){
    return $scope.popUpMessage = false;
  };

  $scope.dropShift = function(day, shift){
    console.log(arguments);
    getUserInfo();

    // delete  $scope.schedule.days[day].shifts[shift].user_ids[id];
  };

}]);
