module.exports = function(app){
  var adapter = require('./adapters/' + app.config.dataAdapter);

  var loadData = function(params, data, callback){
    adapter({
      version: params.version,
      method: params.method,
      collection: params.collection,
      id: params.id
    }, data, callback);
  }

  // API event handling
  app.transmit.provide('api/:version/:method/:collection', loadData);
  app.transmit.provide('api/:version/:method/:collection/:id', loadData);
}

