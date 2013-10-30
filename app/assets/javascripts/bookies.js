var bookies = angular.module('bookies', ['firebase', 'ngRoute']);
bookies.masterUrl = 'https://anicoll-livechat.firebaseio.com';

bookies.run(['angularFireAuth',"Firebase","$rootScope",'angularFire','$location', 'notify', function(angularFireAuth,Firebase,$rootScope,angularFire,$location, notify){
    var ref = new Firebase(bookies.masterUrl);
    // here is where you put the default path
    angularFireAuth.initialize(ref,{'name' : 'firebaseUser', 'path' : '/logIn', 'scope': $rootScope});
  
    var userInfoCreation = function(){
      $rootScope.userInfo = {};
      var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + $rootScope.firebaseUser.id );
      angularFire(userRef, $rootScope, 'userInfo').then(function(){
        $location.path("/schedule");

        var notifyInfo = {
          title: $rootScope.userInfo.first_name + ' Logged In.',
          text: 'using ' + $rootScope.userInfo.email,
          icon: 'vampire',
          type: 'success',
          width: '300px'
        }
        notify(notifyInfo);
      });

    }

    $rootScope.$on("angularFireAuth:login", function() {
      userInfoCreation();
    });
}]);

bookies.filter('range',function(){
  return function(input, total){
    total = parseInt(total);
    for(var i=0; i<total; i++){
      input.push(i);
    }
    return input;
  }
});

bookies.filter('startFrom',['$filter',function($filter){
  return function(input, current_page, page_size){
    if(input){
      return $filter('limitTo')(input.slice(current_page * page_size), page_size)
    }
    // console.log('input: ',input)
    // return input.splice(parseInt(start)); //take off everything before that 
  }
}]);

bookies.factory('notify', function () {
  return function(notifyInfo){
    $.pnotify({
      title: notifyInfo.title || '',
      text: notifyInfo.text  || 'You\'ve won!',
      type: notifyInfo.type  || '',
      icon: notifyInfo.icon || '',
      width: notifyInfo.width || 'auto',
      closer: true,
      closer_hover: true,
      delay: 1000
    });
  };
});  
