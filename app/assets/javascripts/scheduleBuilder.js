bookies.controller('scheduleBuilderController', ['$rootScope','$scope', 'angularFire', function ($rootScope,$scope, angularFire){

  var beginningOfMonth = Date.create().beginningOfMonth();
  if (!beginningOfMonth.isSunday()) {
    beginningOfMonth = beginningOfMonth.advance({days: 7 - beginningOfMonth.getDay()});
  }

  $scope.form_month = {};
  $scope.form_month.startOfMonth = beginningOfMonth.toJSON().slice(0, 10);
  $scope.form_month.shiftLeadOpenDate = beginningOfMonth.rewind({days: 4}).toJSON().slice(0, 10);
  $scope.form_month.openForAllDate = beginningOfMonth.advance({days: 2}).toJSON().slice(0, 10);;
  $scope.form_month.endOfMonth = beginningOfMonth.advance({weeks: 3 ,days: 8}).toJSON().slice(0, 10);
  $scope.form_month.numberOfShiftBlocks = '3';
  $scope.form_month.numberOfPeoplePerShift = '3';
  $scope.form_month.shiftNames = ["Morning", "Afternoon", "Evening", ""];

  $scope.createSchedule = function(){
    // TODO : instead of basing the name off of start of month month, base it off of start of month nearest month start
    var currentMonth = Date.create($scope.form_month.startOfMonth).format('{MM}-{yyyy}');
    // 10-2013
    var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/'+ currentMonth)
    angularFire(ref, $scope, 'month');

    $scope.month = $scope.form_month;

    console.log('$scope.month.startOfMonth' , $scope.month.startOfMonth);
    console.log('$scope.month.endOfMonth' , $scope.month.endOfMonth);

    var range = Date.range($scope.month.startOfMonth, $scope.month.endOfMonth);

    // console.log('number of weeks : ' , (range.end - range.start)% 7);
    $scope.month.days = [];

    for(i = 0; i < $scope.month.numberOfShiftBlocks; i++ ){};
    // Looping for every day in the Month
    range.every('day', function(n){
      var day ={
          "date": n.format('{MM}/{dd}/{yyyy}'),
          "shifts": []
      };

      // Looping for every shift in the Day
      for(i = 0; i < $scope.month.numberOfShiftBlocks; i++ ){
        var shift = {
          "name": $scope.month.shiftNames[i], 
          "available": $scope.month.numberOfPeoplePerShift,
          "id": i
        }
        // Give Day the Shift
        day.shifts.push(shift);
      };
      // Give Month.weeks Array day values
      $scope.month.days[n.format('{d}')] = day;
    });
    
  };
}]);
