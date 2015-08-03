//var app = require('express')();
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(function(req, res, next){
  //logging at the top
  console.log('Request at ' + new Date().toISOString());
  //next allows the program to continue after executing on this middleware
  next();
})

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hello', function (req, res) {
  setTimeout(function(){
    var awesomeThings = ['one', 'fish', 'two', 'fish'];
    res.render('templates/world', {
      title: 'cool stuff',
      awesomeThings: awesomeThings
    });
  }, 5000)
});

app.get('/json', function (req, res) {
  res.send({an: 'object'});
});

app.get('/error', function (req, res) {
  res.send(badvariable);
});

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

