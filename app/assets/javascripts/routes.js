bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
    .when("/",{
     templateUrl: '/schedule',
     controller: "calendarController"
    })
    .when("/scheduleBuilder",{
      templateUrl: '/scheduleBuilder',
      controller: "scheduleBuilderController"
    })
    .when("/signUp",{
      templateUrl: '/signUp',
      controller: "userController"
    })
    .when("/userSettings",{
      templateUrl: '/userSettings',
      controller: "userController"
    });
}]);
