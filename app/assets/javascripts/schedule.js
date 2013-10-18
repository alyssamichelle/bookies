bookies.controller('scheduleController', ['$rootScope','$scope', 'firebaseCollection', 'angularFire', function ($rootScope,$scope, firebaseCollection, angularFire){
  $scope.currentDay = {};
  $scope.currentDay.day = Date.create('today').rewind({month:1}).format('{d}');
  $scope.currentDay.month = Date.create('today').rewind({month:1}).format('{MM}');
  $scope.currentDay.year = Date.create('today').rewind({month:1}).format('{yyyy}');

  console.log('$scope.currentDay', $scope.currentDay);
  

  // var when = Date.create('september 2013');
  // var theDate = when.format('{MM}-{yyyy}');
  var today = Date.create('today');
  var lastMonth = today.rewind({month : 1});
  var when = lastMonth.format('{MM}-{yyyy}');
  console.log('when : ', when);

  var ref = new Firebase('https://anicoll-livechat.firebaseio.com/Schedule/' + when);
  angularFire(ref, $scope, 'schedule').then(function(){

    console.log('schedule', $scope.schedule);

    var currentMonth = $scope.schedule.startOfMonth;
    $scope.displayDate = $scope.schedule.days[$scope.currentDay.day].date;
  }, function(){
    console.log('There was an error when trying to get the months information.');
  });

  $scope.nextDay = function(){
    $scope.currentDay.day++;
    $scope.displayDateChange();
  };

  $scope.prevDay = function(){
    $scope.currentDay.day--;
    $scope.displayDateChange();
  };

  $scope.displayDateChange = function(){
    $rootScope.calendarioPrototype.getCell( $scope.currentDay.day ).addClass('displayDate');
    $scope.displayDate = $scope.schedule.days[$scope.currentDay.day].date;
    console.log('currentDay', $scope.currentDay);
  };

  $scope.getNumber = function(num) {
    return new Array(parseInt(num));
  }

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



  var cal = $( '#calendar' ).calendario( {
      onDayClick : function( $el, $contentEl, dateProperties ) {

        for( var key in dateProperties ) {
          console.log( key + ' = ' + dateProperties[ key ] );
        }

      },
      caldata : codropsEvents
    } ),
    $month = $( '#custom-month' ).html( $rootScope.calendarioPrototype.getMonthName() ),
    $year = $( '#custom-year' ).html( $rootScope.calendarioPrototype.getYear() );

  $scope.nextMonth = function(){
    $rootScope.calendarioPrototype.gotoNextMonth( updateMonthYear );
  };

  $scope.prevMonth = function(){
    $rootScope.calendarioPrototype.gotoPreviousMonth( updateMonthYear );
  };

  $scope.current = function(){
    $rootScope.calendarioPrototype.gotoNow( updateMonthYear );
  };

  function updateMonthYear() {
    $month.html( $rootScope.calendarioPrototype.getMonthName() );
    $year.html( $rootScope.calendarioPrototype.getYear() );
  }

}]);
