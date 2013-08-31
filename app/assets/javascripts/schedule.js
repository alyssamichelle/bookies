bookies.controller('scheduleController', ['$rootScope','$scope', 'firebaseCollection', function ($rootScope,$scope, firebaseCollection){
  var current = firebaseCollection('Schedule/Current', 100);
 
    //week pagination
  $scope.currentPage = 0;
  $scope.pageSize = 7;
  $scope.numberOfPages = 0;

  // if todays date >= the StartOFTheMonth, then push Current into Past , and push Future into Current.
  current.then(function(data_month) { 
    $scope.schedule = data_month;
    setup_page();
    firebaseCollection('Schedule/Future',500).then(function(future){
      // This checks to see what the day is and makes sure the months in Current should be there
      // if not it moves them to Past, also makes sure months in Future should be there
      // if not it moves them to Current
      for(var i = 0, len = future.length; i < len ; i++ ){
        if(Date.create().isAfter(future[i].startOfMonth) || Date.create().isToday(future[i].startOfMonth)){
          if($scope.schedule[0])
          {
            //angular copy removes firebase defined varables
            //we were running into max stack exceded error though
            //so we are manually removing these, 
            //so we can just have an array to add to the past
            
            
            firebaseCollection('Schedule/Past').then(function(Past){
              var month = $scope.schedule[0];
              var ref = month.$ref;
              month = angular.toJson(month);
              month = angular.fromJson(month);

              Past.add(month)
              month.$ref = ref;
              $scope.schedule.remove(month);
            });
          }
          future.remove(future[i]);
          delete future[i].$id;
          delete future[i].$ref;
          delete future[i].$index;
          $scope.schedule.add(future[i], setup_page);
         
        };
        // if(Date.create().isAfter(future[i].shiftLeadOpenDate && $$rootScope.)){}
      };
      // if todays date >= OpenToLeads && I am a Lead, then append Future to $scope.schedule
      // if todays date >= OpenToAll,  then append Future to $scope.schedule
     
      });
  });
  
  var setup_page = function()
  {
    $scope.numberOfPages = function(){
      return Math.ceil($scope.schedule[0].days.length/$scope.pageSize);
    };
  }

  $scope.shiftStuffing = function(day_index,shift_index,id){
    // on click, if inactive , remove user from user_ids array
    if($scope.schedule[0].days[day_index].shifts[shift_index].user_ids &&
       $scope.schedule[0].days[day_index].shifts[shift_index].user_ids[id] && 
      $scope.schedule[0].days[day_index].shifts[shift_index].user_ids[id].status == "inactive"){
      delete  $scope.schedule[0].days[day_index].shifts[shift_index].user_ids[id];
    }
    else{
      // no user_ids array exists yet, set it = to []
      if(! $scope.schedule[0].days[day_index].shifts[shift_index].user_ids) $scope.schedule[0].days[day_index].shifts[shift_index].user_ids = {};
      $scope.schedule[0].days[day_index].shifts[shift_index].user_ids[id] = {"status":"inactive"};
    };
    var month = $scope.schedule[0];
    var ref = month.$ref;

    month = angular.toJson(month);
    month = angular.fromJson(month);
    month.$ref = ref;

    $scope.schedule.update(month); 
  };
}]);
