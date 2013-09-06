module.exports = function(app){
  // API handling
  require('./apiHandlers')(app);

  // pages
  app.get('/', function(req, res){
    res.redirect('/games');
    /*
    res.render('index/index', {
      subtitle: 'Home',
      title: 'Colonies'
    });
    */
  });

  app.get('/games', function(req, res){
    app.transmit.request('api/' + app.config.apiVersion + '/get/games', function(err, data){
      if(err){
        return app.err(err);
      }

      res.render('games/list', {
        subtitle: 'Game',
        games: data
      });
    });
  });

  app.get('/games/:id', function(req, res){
    app.transmit.request('api/' + app.config.apiVersion + '/get/games/' + req.params.id, function(err, data){
      if(err){
        return app.err(req, res, err);
      }

      res.render('games/show', {
        subtitle: 'Game',
        game: data,
        scripts: ['game']
      });
    });
  });
};

