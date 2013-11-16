bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
  
    .when("/",{
      templateUrl: '/schedule',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedule'
    })
    .when("/schedule",{
      templateUrl: '/schedule',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedule'
    })
    .when("/schedulePrint/:currentDay",{
      templateUrl: '/schedulePrint',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedulePrint'
    })
    .when("/scheduleBuilder",{
      templateUrl: '/scheduleBuilder',
      controller: "scheduleBuilderController",
      authRequired: true,
      activeTab: 'scheduleBuilder'
    })
    .when("/signUp",{
      templateUrl: '/signUp',
      controller: "userController",
      authRequired: false,
      activeTab: 'signUp'
    })
    .when("/logIn",{
      templateUrl: '/logIn',
      controller: "userController",
      authRequired: false,
      activeTab: 'logIn'
    })
    .when("/userSettings",{
      templateUrl: '/userSettings',
      controller: "userController",
      authRequired: true,
      activeTab: 'userSettings'
    })
    .when("/staff",{
      templateUrl: '/staff',
      controller: "staffController",
      authRequired: true,
      activeTab: 'staff'
    });
}]);
