var fs = require('fs');
var path = require('path');

//var app = require('express')();
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var chickennuggets = require('./routes/chickennuggets');
var routes = require('./routes/index');
var imgur = require('./routes/imgur');
var pizza = require('./routes/pizza');
var user = require('./routes/user');

if(process.env.NODE_ENV !== 'production'){
  require(path.join(process.cwd(),'/lib/secret'));
}

require('./lib/mongodb');
var app = express();

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);
app.set('strict routing', true);

//all templates now have access to title
app.locals.title = 'My Awesome App';

app.use(session({
  secret: 'expressbasicsisareallycoolapp',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next){
  req.session.count += 1;
  // console.log('Session:', req.session);
  next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('less-middleware')('www/stylesheets'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});

app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

app.use(function(err, req, res, next){
  var client = require('./lib/loggly')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  });
  next();
})

app.use(function getAuthStatus (req, res, next){
  res.locals.user = req.session.user || null;
  next();
})


//========routes======//
app.use('/', routes);
app.use('/user', user);
app.use(express.static('www'));

app.use(function requireAuth(req, res, next) {
  if (res.locals.user) {
    next();
  } else {
    res.redirect('/user/login');
  }
});

app.use('/chickennuggets', chickennuggets);
app.use('/imgur', imgur);
app.use('/pizza', pizza);

app.use(function(req, res){
  //400s before 500s
  res.status(403).send('Unauthorized');
});

app.use(function(err, req, res, next){
//4 arguments creates an error handling middleware
  var client = require('./lib/loggly')('incoming');
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    err: err
  });
  res.status(500).send('my bad');
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
