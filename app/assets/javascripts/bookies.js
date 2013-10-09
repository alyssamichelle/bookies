var bookies = angular.module('bookies', ['firebase']);
bookies.masterUrl = 'https://anicoll-livechat.firebaseio.com';

bookies.run(['angularFireAuth',"Firebase","$rootScope", function(angularFireAuth,Firebase,$rootScope){
    var ref = new Firebase(bookies.masterUrl);
    angularFireAuth.initialize(ref,{'name' : 'user', 'path' : '/', 'scope': $rootScope});
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
