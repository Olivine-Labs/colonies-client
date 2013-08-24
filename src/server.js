// Load all of the dependencies we need to start up the web server

var spdy = require('spdy'),
    connect = require('connect'),
    express = require('express'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    expressTransmit = require('express-transmit'),
    hbs = require('express-hbs');

require('./assets/js/helpers/helpers')(hbs);

// Create a memory storage system to hold sessions; we may replace this with
// Redis or something later on
var store = new express.session.MemoryStore();

// Start up a new Express instance, and set the config
var app = express();
app = expressTransmit(app);
app.config = require('./config/config.js');

// Load in the SSL keys and certs so that we can start a secure server
app.config.httpOptions = {
  key: fs.readFileSync(app.config.sslKey),
  cert: fs.readFileSync(app.config.sslCert)
};

// Set the port that the webserver should run on
app.set('port', app.config.port);

// Configure the webserver, and set up middleware
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('get-methodoverride'));
  app.use(express.cookieParser());
  app.use(express.favicon());
  app.use(connect.compress());

  app.use(express.session({
    secret: app.config.sessionSecret,
    store: store
  }));

  // Set up static directories; if a file isn't found in one directory, it will
  // fall back to the next
  app.use(express.static(__dirname + '/public/build'));
  app.use(express.static(__dirname + '/assets'));
  app.use(express.static(__dirname + '/public'));

  // Set up handlebars parsing on the server
  app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/templates',
    layoutsDir: __dirname + '/templates/layouts',
    handlebars: handlebars
  }));

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/templates');

  // ./routes.js contains all of the routes that the webserver should parse
  require('./routes.js')(app);

  // ./providers has transmit providers, like API handling
  require('./providers/api.js')(app);
});

// Require in error handler
app.err = require('./error');

// Use express's error handler if we're in development, for pretty stack traces
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Create a server using spdy, and pass in the certs
var server = spdy.createServer(app.config.httpOptions, app);

// Start listening on the configured port
server.listen(app.get('port'));


// server running, display welcome message 

console.info('Welcome to the Colonies Web Client.');

console.info('Running on port ' + app.get('port') + ' using the '
              + app.config.environment + ' environment settings.');

if(app.config.environment == 'development'){
  console.info('Open: https://localhost:' + app.get('port'));
}

