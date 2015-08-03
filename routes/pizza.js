var express = require('express');
var router = express.Router();

router.get('/:topping/:size', function (req, res) {
  res.render('templates/pizza', req.params);
});

module.exports = router;
