bookies.controller('staffController', ['$rootScope', '$scope', 'angularFire', '$routeParams','notify', function ($rootScope, $scope, angularFire, $routeParams, notify){

  $scope.angularFireUser = {};
  var usersRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/');
  angularFire(usersRef, $scope, 'angularFireUsers').then(function(){
    console.log($scope.angularFireUsers);

  }, function(err){
    var notifyInfo = {
      text: 'Error',
      text: err,
      icon: 'skull'
    } 
    notify(notifyInfo);
  });

  $scope.staffTypeSelect = [
    {
      "id": "student",
      "name": "Student"
    },{
      "id": "admin",
      "name": "Admin"
    },{
      "id": "inactive",
      "name": "Inactive"
    }
  ];


}]);
