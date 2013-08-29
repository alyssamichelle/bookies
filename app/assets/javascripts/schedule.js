bookies.controller('scheduleController', ['$rootScope','$scope', 'firebaseCollection','$timeout', function ($rootScope,$scope, firebaseCollection,$timeout){
  var current = firebaseCollection('Schedule/Current');
  var future = firebaseCollection('Schedule/Future');
  // if todays date >= the StartOFTheMonth, then push Current into Past , and push Future into Current.
  $timeout(function() {
     
    for(var i = 0, len = future.length; i < len ; i++ ){
      if(Date.create().isAfter(future[i].startOfMonth) || Date.create().isToday(future[i].startOfMonth)){
        if(current[0])
        {
          
          delete current[0].$id;
          delete current[0].$ref;
          delete current[0].$index;
          firebaseCollection('Schedule/Past').add(current[0]);
        }
        //angular copy removes firebase defined varables
        future.remove(future[i]);
        delete future[i].$id;
        delete future[i].$ref;
        delete future[i].$index;
        current.add(future[i]);
       
      };
      // if(Date.create().isAfter(future[i].shiftLeadOpenDate && $$rootScope.)){}
    };
    // if todays date >= OpenToLeads && I am a Lead, then append Future to Current
    // if todays date >= OpenToAll,  then append Future to Current


    $scope.schedule = current[0];

    set_status();

    
  }, 1000);
  
  var set_status = function()
  {
     for(var i = 0, length = $scope.schedule.days.length; i < length; i++){
      for(var a = 0, shift_length = $scope.schedule.days[i].shifts.length; a < shift_length; a++){
        if($scope.schedule.days[i].shifts[a].user_ids){
          for(var r = 0, id_length = $scope.schedule.days[i].shifts[a].user_ids.length; r < id_length; r++){
            if($rootScope.current_user_id == $scope.schedule.days[i].shifts[a].user_ids[r]) {
              // if($scope.schedule.days[i].status)
              $scope.schedule.days[i].status += " "+$scope.schedule.days[i].shifts[a].name;
              $scope.schedule.days[i].shifts[a].status = "inactive";
            };
          }
        }
      }
    };
  }


// looping through schedule[i].date is between variable (week span), 
// add status class and then push it into array
// from this array is what my markup is built from
// new variable = [shifts for this week]
//loop through shifts and figure out what class it should have
  // shift.status = inactive;
  
  // current user id is in array
    // -> give class of active

  // if shiftidarray is full 
    // -> user id added to waitlist
  // if shiftidarray.available is 0 
    // -> then class of blocked


  
  $scope.shiftStuffing = function(day_index,shift_index,id){


    // on click, if inactive , remove user from user_ids array
    if($scope.schedule.days[day_index].shifts[shift_index].status == "inactive"){
      var id_index = $scope.schedule.days[day_index].shifts[shift_index].user_ids.indexOf(id);
      current[0].days[day_index].shifts[shift_index].user_ids.splice(id_index,1);
      console.log("running ", $scope.schedule.days[day_index].shifts[shift_index].user_ids);

    }
    else {
      // no user_ids array exists yet, set it = to []
      if(! current[0].days[day_index].shifts[shift_index].user_ids) current[0].days[day_index].shifts[shift_index].user_ids = [];
      current[0].days[day_index].shifts[shift_index].user_ids.push(id);
    }
   
    var month = current[0];
    var ref = month.$ref;

    month = angular.toJson(month);
    month = angular.fromJson(month);
    month.$ref = ref;

    current.update(month); 

    $scope.schedule = current[0];
    set_status();   
  };

}]);
