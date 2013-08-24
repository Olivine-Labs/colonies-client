var _ = require('underscore');

var fakeData = {
  meks: [
    { '_id':'518867b2a7bce57c23000001', 'health':100, 'position':{'x':0}, 'createdAt':1367893938},
    { '_id':'5188770fa7bce52007000001','health':100,'position':{'x':0},'createdAt':1367897871},
    { '_id':'51887710a7bce52007000002','health':100,'position':{'x':0},'createdAt':1367897872},
    { '_id':'51887711a7bce52007000003','health':100,'position':{'x':0},'createdAt':1367897873}
  ],

  games: [
    {'_id':'51843fb6a7bce5102800001a','meks':['51887710a7bce52007000002','51887711a7bce52007000003'],'turn':'0','createdAt':(Date.now()/1000)},
    {'_id':'51843fb6a7bce5102800002b','meks':['518867b2a7bce57c23000001','5188770fa7bce52007000001'],'turn':'0','createdAt':(Date.now()/1000)}
  ]
};

var methods = {
  get: function(request, data, callback){
    var collection = fakeData[request.collection];

    if(request.id){
      var data = _.find(collection, function(r){
        return r._id == request.id;
      });

      if(data){
        return callback(null, data);
      }

      return callback({ status: 404, message: request.id + ' in collection ' + request.collection + ' not found.' });
    }else{
      return callback(null, collection);
    }
  },

  post: function(request, data, callback){
    var collection = fakeData[request.collection];

    data._id = parseInt(Math.random() * 100000000);
    fakeData[request.Collection].push(data);

    return callback(null, data);
  },

  put: function(request, data, callback){
    var collection = fakeData[request.collection];

    methods.get(request, data, function(err, data){
      if(err){ return callback(err); }

      var index = collection.map(function(x) { return x._id; }).indexOf(request.id);
      collection[index] = data;

      return callback(null, data);
    });
  },

  patch: function(request, data, callback){
    var collection = fakeData[request.collection];

    methods.get(request, data, function(err, originalData){
      if(err){ return callback(err); }

      var index = collection.map(function(x) { return x._id; }).indexOf(request.id);
      data = _.extend(originalData, data);

      fakeData[request.collection][index] = data;

      return callback(null, data)
    });
  },

  'delete': function(request, data, callback){
    var collection = fakeData[request.collection];

    methods.get(request, data, function(err, data){
      if(err){
        return callback(err);
      }

      var index = collection.map(function(x) { return x._id; }).indexOf(request.id);
      delete fakeData[request.collection][index];

      return callback(null, data)
    });
  }
}

var filterMethods = function(request, data, callback){
  var allowedModelMethods = [ 'GET', 'PUT', 'PATCH', 'DELETE' ],
      allowedCollectionMethods = [ 'GET', 'POST' ],
      currentAllowedMethods = allowedModelMethods,
      i = 0,
      pass = false;

  if(!request.id){ currentAllowedMethods = allowedCollectionMethods; }

  if(methods[request.method.toLowerCase()]){
    for(; i < currentAllowedMethods.length; i++){
      if(request.method.toUpperCase() == currentAllowedMethods[i]){
        pass = true;
      }
    }
  }

  if(!pass){
    callback({
      status: 405,
      message: 'Method not allowed',
      headers: {
        Allow: methods
      }
    }, null)
  }

  return pass;
};

var filterCollections = function(request, data, callback){
  if(!fakeData[request.collection]){
    callback({
      status: 404,
      message: 'Collection not found'
    }, null)

    return false;
  }

  return true;
};

module.exports = function(request, data, callback){
  if(filterMethods(request, data, callback)){
    if(filterCollections(request, data, callback)){
      methods[request.method.toLowerCase()](request, data, callback);
    }
  }
}

