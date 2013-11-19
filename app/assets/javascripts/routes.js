bookies.config(['$routeProvider', function($routeProvider){
  console.log('routes.js running: ' , $routeProvider);
  $routeProvider
  
    .when("/",{
      templateUrl: '/schedule',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedule',
      resolve: {
        'auth' :['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
    })
    .when("/schedule",{
      templateUrl: '/schedule',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedule',
      resolve: {
        'auth' : ['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
    })
    .when("/schedulePrint/:currentDay",{
      templateUrl: '/schedulePrint',
      controller: "scheduleController",
      authRequired: true,
      activeTab: 'schedulePrint',
      resolve: {
        'auth' : ['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            alert('Must be signed in as a student, to print a schedule.');
            return $q.reject('Not Authenticated');
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
    })
    .when("/scheduleBuilder",{
      templateUrl: '/scheduleBuilder',
      controller: "scheduleBuilderController",
      authRequired: true,
      activeTab: 'scheduleBuilder',
      resolve: {
        'auth' : ['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
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
      activeTab: 'userSettings',
      resolve: {
        'auth' : ['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
    })
    .when("/staff",{
      templateUrl: '/staff',
      controller: "staffController",
      authRequired: true,
      activeTab: 'staff',
      resolve: {
        'auth' : ['$rootScope', '$q', function($rootScope, $q){
          if($rootScope.userInfo.type && $rootScope.userInfo.type == 'student'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'admin'){
            return true;
          }else if($rootScope.userInfo.type && $rootScope.userInfo.type == 'inactive'){
            alert('No, No, No, You Are Not Authorized!');
            return $q.reject('Not Authenticated');
          }
        }]
      }
    });
}]);
