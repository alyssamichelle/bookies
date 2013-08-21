bookies.controller('scheduleController', ['$rootScope','$scope', 'firebaseCollection', function ($rootScope,$scope, firebaseCollection){
  $scope.schedule = firebaseCollection('Schedule');
  $scope.users = firebaseCollection('Users');

  var shift ={
      "date": "20130814",
      "shifts": [
        {"name": "morning", "waitlist": [], "user_ids": [], "available" : 3},
        {"name": "mid", "waitlist": [], "user_ids": [], "available" : 3},
        {"name": "night", "waitlist": [], "user_ids": [], "available" : 3}
      ]
    };

  $scope.schedule.add(
    shift
    );
  console.log('uses',$scope.users);
  console.log('schedule ' , $scope.schedule)
  console.log('OUTER scope ',$scope);
  console.log('root',$rootScope);
  $scope.shiftStuffing = function(day,index,id){
    console.log('currentShift ', day, index, id);
    // update my day so it has a user id
    day.shifts[index].user_ids.push(id);
    // update collection with this shift?
    $scope.schedule.update(day);    
  };

}]);
