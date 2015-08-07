var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/awesomethings', function (req, res) {
    var collection = global.db.collection('awesomeThings');
    collection.find().toArray(function(err, things){
      res.render('templates/world', {
        awesomeThings: things
      });
    })
});



router.get('/json', function (req, res) {
  res.send({an: 'object'});
});

router.get('/error', function (req, res) {
  res.send(badvariable);
});

module.exports = router;
