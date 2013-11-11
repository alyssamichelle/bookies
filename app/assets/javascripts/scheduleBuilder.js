bookies.controller('scheduleBuilderController', ['$rootScope','$scope', 'angularFire', '$route', '$location', function ($rootScope, $scope, angularFire, $route, $location){
  $scope.$route = $route;

  var beginningOfMonth = Date.create().beginningOfMonth();
  if (!beginningOfMonth.isSunday()) {
    beginningOfMonth = beginningOfMonth.advance({days: 7 - beginningOfMonth.getDay()});
  }

  $scope.meridiemSelects = [
    {
      "id": "am",
      "name": "<img src=\"/assets/utilities/171-sun@2x.png\"/>&nbsp;AM"
    },
    {
      "id": "pm",
      "name": "<img src=\"/assets/utilities/126-moon@2x.png\"/>&nbsp;PM"
    }
  ]

  $scope.timeSelects = {
    "01:00":{
      "id": "1:00",
      "name": "01:00"
    },
    "02:00":{
      "id": "2:00",
      "name": "02:00"
    },
    "03:00":{
      "id": "3:00",
      "name": "03:00"
    },
    "04:00":{
      "id": "4:00",
      "name": "04:00"
    },
    "05:00":{
      "id": "5:00",
      "name": "05:00"
    },
    "06:00":{
      "id": "6:00",
      "name": "06:00"
    },
    "07:00":{
      "id": "7:00",
      "name": "07:00"
    },
    "08:00":{
      "id": "8:00",
      "name": "08:00"
    },
    "09:00":{
      "id": "9:00",
      "name": "09:00"
    },
    "10:00":{
      "id": "10:00",
      "name": "10:00"
    },
    "11:00":{
      "id": "11:00",
      "name": "11:00"
    },
    "12:00":{
      "id": "12:00",
      "name": "12:00"
    }
  }

  $scope.form_month = {};
  $scope.form_month.startOfMonth = beginningOfMonth.toJSON().slice(0, 10);
  $scope.form_month.shiftLeadOpenDate = beginningOfMonth.rewind({days: 4}).toJSON().slice(0, 10);
  $scope.form_month.openForAllDate = beginningOfMonth.advance({days: 2}).toJSON().slice(0, 10);;
  $scope.form_month.endOfMonth = beginningOfMonth.advance({weeks: 3 ,days: 8}).toJSON().slice(0, 10);
  $scope.form_month.numberOfShiftBlocks = '3';
  $scope.form_month.numberOfPeoplePerShift = '3';
  $scope.form_month.shiftNames = [];

  // on numberOfShiftBlocks change
  //   create array of empty shift objects
  //   put them in shiftNames
  // 
  // makeShift()
  // returns object {name:"",startTime:"",endTime:""}
  //
  // ng-repeat on shift in shiftNames
  // ng-model


  $scope.onShiftBlockChange = function(count){
    console.log("onShiftBlockChange")
    $scope.form_month.shiftNames = [];
    for (var i = 0; i < count; i++){
      $scope.form_month.shiftNames.push({
        name: null,
        start: null,
        startMeridiem: null,
        end: null,
        endMeridiem: null
      });
    }
  }

  $scope.createSchedule = function(){
    $('.create-schedule-button').attr('disabled', true);
    var keyRef = new Firebase('https://anicoll-livechat.firebaseio.com/ScheduleKeys/');
    $scope.scheduleKeys = [];
    angularFire(keyRef, $scope, 'scheduleKeys').then(function(){
      $scope.scheduleKeys.push($scope.form_month.startOfMonth);
    });

    // .fail(function(){
    //   $('.create-schedule-button').removeAttr('disabled');
    // });
  
    // console.log('$scope.form_month.startOfMonth',$scope.form_month.startOfMonth);
    $scope.firebaseSchedule = {};
    var scheduleRef = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/'+ $scope.form_month.startOfMonth)
    angularFire(scheduleRef, $scope, 'firebaseSchedule').then(function(){
      $scope.firebaseSchedule = $scope.form_month;
      console.log('$scope.form_month',$scope.form_month);
      var range = Date.range($scope.firebaseSchedule.startOfMonth, $scope.firebaseSchedule.endOfMonth);
      $scope.firebaseSchedule.days = {};

      for(i = 0; i < $scope.firebaseSchedule.numberOfShiftBlocks; i++ ){};
      // Looping for every day in the Month
      range.every('day', function(n){
        var day ={
            "date": n.format('{MM}/{dd}/{yyyy}'),
            "shifts": []
        };

        // Looping for every shift in the Day
        for(i = 0; i < $scope.firebaseSchedule.numberOfShiftBlocks; i++ ){
          var shift = $scope.firebaseSchedule.shiftNames[i];
          shift['available'] = $scope.firebaseSchedule.numberOfPeoplePerShift;
          shift['id'] = i;
          // Give Day the Shift
          day.shifts.push(shift);
        };
        // Give Month.weeks Array day values
        $scope.firebaseSchedule.days[n.format('{MM}-{dd}')] = day;

        $location.path("/schedule");
    })
  });
// .fail(function(){alert('Schedule Creation Failed')});

    
  $scope.submitThatSchedule = function(){
    $location.path('/schedule');
    $scope.createSchedule();
  };
    
  };
}]);
