bookies.controller('adminController', ['$rootScope','$scope', 'firebaseCollection', function ($rootScope,$scope, firebaseCollection){
  firebaseCollection('Schedule/Future',1000).then(function(future){
        $scope.scheduleArray = future;
    });

  var beginningOfMonth = Date.create().beginningOfMonth();
  if (!beginningOfMonth.isSunday()) {
    beginningOfMonth = beginningOfMonth.advance({days: 7 - beginningOfMonth.getDay()});
  }
  $scope.month = {};
  $scope.month.startOfMonth = beginningOfMonth.toJSON().slice(0, 10);
  $scope.month.shiftLeadOpenDate = beginningOfMonth.rewind({days: 4}).toJSON().slice(0, 10);
  $scope.month.openForAllDate = beginningOfMonth.advance({days: 2}).toJSON().slice(0, 10);;
  $scope.month.endOfMonth = beginningOfMonth.advance({weeks: 3 ,days: 8}).toJSON().slice(0, 10);
  $scope.month.numberOfShiftBlocks = '3';
  $scope.month.numberOfPeoplePerShift = '3';
  $scope.month.shiftNames = ["Morning", "Afternoon", "Evening", ""];

  console.log($scope.firstSunday);

  $scope.createSchedule = function(){
 
    //build out json based on parameters above
    var range = Date.range($scope.month.startOfMonth, $scope.month.endOfMonth);
    // on call of the create month button run a fn that adds month info to month and then 
    // day loop and shuff day stuff in that month
    $scope.month.days = [];
    // Looping for every day in the Month
    range.every('day', function(n){
      var day ={
          "date": n.format('{MM}/{dd}/{yyyy}'),
          "shifts": []
      };
      console.log('n : ', n.format('{MM}/{dd}/{yyyy}'))
      // Looping for every shift in the Day
      for(i = 0; i < $scope.month.numberOfShiftBlocks; i++ ){
        var shift = {
          "name": $scope.month.shiftNames[i], 
          "available": $scope.month.numberOfPeoplePerShift
        }
        // Give Day the Shift
        day.shifts.push(shift);
      };
      // Give Month.days Array day values
      $scope.month.days.push(day);
    });
    // Give Firebase Schedule Array with a populated Month
    $scope.scheduleArray.add($scope.month);
  };
}]);
