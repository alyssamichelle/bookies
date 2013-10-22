bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
    .when("/schedule",{
     templateUrl: '/schedule',
     controller: "scheduleController",
      authRequired: true
    })
    .when("/scheduleBuilder",{
      templateUrl: '/scheduleBuilder',
      controller: "scheduleBuilderController",
      authRequired: true
    })
    .when("/signUp",{
      templateUrl: '/signUp',
      controller: "userController"
    })
    .when("/logIn",{
      templateUrl: '/logIn',
      controller: "userController"
    })
    .when("/userSettings",{
      templateUrl: '/userSettings',
      controller: "userController",
      authRequired: true
    });
}]);
