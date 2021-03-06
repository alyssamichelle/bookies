var bookies = angular.module('bookies', ['firebase', 'ngRoute', '$strap']);
bookies.masterUrl = 'https://anicoll-livechat.firebaseio.com';


bookies.run(['angularFireAuth',"Firebase","$rootScope",'angularFire','$location', 'notify', function(angularFireAuth,Firebase,$rootScope,angularFire,$location, notify){
    var ref = new Firebase(bookies.masterUrl);
    // here is where you put the default path
    angularFireAuth.initialize(ref,{'name' : 'firebaseUser', 'path' : '/logIn', 'scope': $rootScope});
    var dis; 
    var userInfoCreation = function(){
      $rootScope.userInfo = {};
      var userRef = new Firebase('https://anicoll-livechat.firebaseio.com/Users/' + $rootScope.firebaseUser.id );
      angularFire(userRef, $rootScope, 'userInfo').then(function(diss){

        dis = diss;
        var notifyInfo = {
          title:  'Velcome ' + $rootScope.userInfo.first_name,
          text:   'mu-ha-ha',
          icon:   'vampire',
          type:   'success',
          width:  '300px'
        }
        notify(notifyInfo);
        $location.path("/schedule");
      });

    }

    $rootScope.$on("angularFireAuth:login", function() {
      userInfoCreation();
    });
    $rootScope.$on("angularFireAuth:logout", function() {
      if(dis)
      {
        dis();
        $rootScope.userInfo = {};
      }
      $location.path("/logIn");
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

bookies.filter('initial',['$filter',function($filter){
  return function(name){
    if(name){
      // Rachel kicks javascript butt!
      var initial = name.split(" ")
      var initials = initial[0].charAt(0) + initial[1].charAt(0);
      return initials;
    }
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
      delay: 3000
    });
  };
});  
