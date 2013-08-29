bookies.factory("firebaseCollection", ["angularFireCollection",function(angularFireCollection){
  var collections ={};

  var Collection =function(url){
    var data = angularFireCollection("https://anicoll-livechat.firebaseio.com/" + url);

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
  return function(url){
    //if I have not already requested it and it does not exist in my collection
    if(!collections[url]){
      collections[url] = new Collection(url);
    }
    // give me the object from the request
    return  collections[url];
  };
}]);
