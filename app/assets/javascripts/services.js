bookies.factory("firebaseCollection", ["angularFireCollection", "$q", "$timeout","Firebase", function(angularFireCollection, $q, $timeout,Firebase){
  var collections ={};

  var Collection =function(url){
    var ref = new Firebase("https://anicoll-livechat.firebaseio.com/" + url)
    var data = angularFireCollection(ref);

    data.getByKey = function(key, value) {
      for (var i = 0; i < data.length; i++) {
        if(data[i][key] == value) {
          return data[i];
        };
      }
      return false;
    };

    return data;
  };
  return function(url,timeout){
    //if I have not already requested it and it does not exist in my collection
    if(!collections[url]){
      collections[url] = new Collection(url);
    }
    // Create the deferred and promise objects
    var deferred = $q.defer();
    var promise = deferred.promise;

      // if we didn't get a timeout through the params
      if(typeof timeout === "undefined"){
        // set the timeout
        timeout = 2000;
      }

      // function for createing a timeout
      var create_timeout = function(){
        // Create a timeout
        $timeout(function(){ 
          timeout--; // subtract one from the time before timeout
          // if the collection length is greater then 0
          if(collections[url].length > 0){
            // resolve the promise with the collection
            deferred.resolve(collections[url]);
          }
          // if the time out hasn't happened yet
          else if(timeout > 0){
            create_timeout(); // make a new time out
          }
          // if the call has timeout
          else{
            // send back the collection as is, no information
            // * this is a fix for if the collection has no length but we did get something back
            deferred.resolve(collections[url]);
          }
        },1);
      };

    create_timeout();// create the first timeout
    return promise; // return the promise
  };

}]);
