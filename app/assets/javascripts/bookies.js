var bookies = angular.module('bookies', ['firebase']);
bookies.masterUrl = 'https://anicoll-livechat.firebaseio.com';

bookies.run(['angularFireAuth', function(angularFireAuth){
    angularFireAuth.initialize(bookies.masterUrl,{'name' : 'user', 'path' : '/'});
}]);

bookies.filter('range',function()
{
  return function(input, total)
  {
    total = parseInt(total);
    for(var i=0; i<total; i++)
    {
      input.push(i);
    }
    return input;
  }
})
