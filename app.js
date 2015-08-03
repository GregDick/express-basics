//var app = require('express')();
var express = require('express');
var app = express();
var routes = require('./routes/index');
var pizza = require('./routes/pizza');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);
app.set('strict routing', true);

//all templates now have access to title
app.locals.title = 'My Awesome App';

app.use(function(req, res, next){
  //logging at the top
  console.log('Request at ' + new Date().toISOString());
  //next allows the program to continue after executing on this middleware
  next();
})

app.use(express.static('public'));

//========routes======//
app.use('/', routes);
app.use('/pizza', pizza);

app.use(function(req, res){
  //400s before 500s
  res.status(403).send('Unauthorized');
});

app.use(function(err, req, res, next){
//4 arguments creates an error handling middleware
  console.log('ERRRR', err.stack);
  res.status(500).send('my bad');
})
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
