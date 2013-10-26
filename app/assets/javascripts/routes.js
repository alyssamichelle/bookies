bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
  
    .when("/",{
      templateUrl: '/schedule',
      controller: "scheduleController"
      ,authRequired: true
    })
    .when("/schedule",{
      templateUrl: '/schedule',
      controller: "scheduleController"
      ,authRequired: true
    })
    .when("/schedulePrint",{
      templateUrl: '/schedulePrint',
      controller: "scheduleController"
      ,authRequired: true
    })
    .when("/scheduleBuilder",{
      templateUrl: '/scheduleBuilder',
      controller: "scheduleBuilderController"
      ,authRequired: true
    })
    .when("/signUp",{
      templateUrl: '/signUp',
      controller: "userController"
      , authRequired: false
    })
    .when("/logIn",{
      templateUrl: '/logIn',
      controller: "userController"
      ,authRequired: false
    })
    .when("/userSettings",{
      templateUrl: '/userSettings',
      controller: "userController"
      ,authRequired: true
    });
}]);
