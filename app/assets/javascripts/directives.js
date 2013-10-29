angular.module('bookies').directive('slabText', function(){
  return {
    priority: 99,
    link: function(scope, element, attrs){
      console.log(arguments);
      $(element[0]).slabText();
    }
  }
});

angular.module('bookies').directive('dropDown',function(){
  return {
    priority: 99,
    link: function(scope, element, attrs){
      console.log(arguments);
      $(element[0]).dropdown({ gutter : 5 });
    }
  }
});
