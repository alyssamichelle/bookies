bookies.controller('calendarController', ['$rootScope','$scope', 'firebaseCollection', function ($rootScope,$scope, firebaseCollection){
  var monthModifier = 0;
  $scope.previous = function(){
    monthModifier--;
    monthBuilder();
  };

  $scope.next = function(){
    monthModifier++;
    monthBuilder();
  };
  var monthBuilder = function(start){
    var today = Date.create().addMonths(monthModifier)
      , start = today.clone().beginningOfMonth()
      , end   = today.clone().endOfMonth();
    $scope.month = today.format('{Month}');
    $scope.year = today.format('{yyyy}');

    // If the first day is not Sunday
    var dayOfWeek = start.getDay()
    if (dayOfWeek !== 0) start.addDays(-dayOfWeek);

    // Get the weeks and loop through them
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
        $scope.weeks[i].push(day.format('{d}'));
        // console.log(day.format('short'));
      }
    }
  };
  monthBuilder();

  $scope.testThatDate = Date.create().endOfMonth();


}]);

