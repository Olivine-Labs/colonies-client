module.exports = function(app){
  // API route handling
  app.get('/api/:collection', function(req, res){
    var requestPath = 'api/' + app.config.apiVersion + '/get/' +
        req.params.collection;

    app.transmit.request(requestPath, req.query, function(err, data){
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });

  app.get('/api/:collection/:id', function(req, res){
    var requestPath = 'api/' + app.config.apiVersion + '/get/' +
        req.params.collection + '/' + req.params.id;

    app.transmit.request(requestPath, req.query, function(err, data){
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });

  app.post('/api/:collection', function(req, res) {
    var requestPath = 'api/' + app.config.apiVersion + '/post/' +
        req.params.collection;

    app.transmit.request(requestPath, req.body, function(err, data) {
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });

  app.put('/api/:collection/:id', function(req, res) {
    var requestPath = 'api/' + app.config.apiVersion + '/put/' +
        req.params.collection + '/' + req.params.id;

    app.transmit.request(requestPath, req.body, function(err, data) {
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });

  app.patch('/api/:collection/:id', function(req, res) {
    var requestPath = 'api/' + app.config.apiVersion + '/patch/' +
        req.params.collection + '/' + req.params.id;

    app.transmit.request(requestPath, req.body, function(err, data) {
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });

  app.del('/api/:collection/:id', function(req, res) {
    var requestPath = 'api/' + app.config.apiVersion + '/delete/' +
        req.params.collection + '/' + req.params.id;

    app.transmit.request(requestPath, function(err, data) {
      if(err){
        app.err(req, res, err);
      }else{
        res.json(data)
      }
    });
  });
}

