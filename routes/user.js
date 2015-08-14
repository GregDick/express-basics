var express = require('express');
var router = express.Router();


router.get('/new', function newUser(req, res){
  res.render('templates/new-user');
});

router.post('/', function createUser(req, res){
  console.log(req.body);
  User.create(req.body, function(err){
    if (err) {
      res.render('user/new', {err: err});
    }else{
      res.redirect('/');
    }
  })
});

module.exports = router;
