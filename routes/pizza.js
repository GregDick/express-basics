var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var obj = {
    size : req.query.size || 'small',
    topping : req.query.topping || 'cheese'
  }
  res.render('templates/pizza', obj);
});

module.exports = router;
