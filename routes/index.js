var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/hello', function (req, res) {
  setTimeout(function(){
    var awesomeThings = ['one', 'fish', 'two', 'fish'];
    res.render('templates/world', {
      awesomeThings: awesomeThings
    });
  }, 5000)
});



router.get('/json', function (req, res) {
  res.send({an: 'object'});
});

router.get('/error', function (req, res) {
  res.send(badvariable);
});

module.exports = router;
