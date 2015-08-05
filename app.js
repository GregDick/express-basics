var fs = require('fs');

//var app = require('express')();
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');


var chickennuggets = require('./routes/chickennuggets');
var routes = require('./routes/index');
var imgur = require('./routes/imgur');
var pizza = require('./routes/pizza');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);
app.set('strict routing', true);

//all templates now have access to title
app.locals.title = 'My Awesome App';

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('less-middleware')('public'));

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

app.use(express.static('public'));



//========routes======//
app.use('/chickennuggets', chickennuggets);
app.use('/imgur', imgur);
app.use('/pizza', pizza);
app.use('/', routes);

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
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
