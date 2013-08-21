bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
    .when("/",{
     templateUrl: '/dayView.html',
     controller: "scheduleController"
    })
    .when("/chat",{
      templateUrl: '/chat.html',
      controller: "chatController"
    })
    .when("/schedule",{
      templateUrl: '#',
      controller: "scheduleController"
    });

}]);
