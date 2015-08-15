var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/login', function loginUser(req, res){
  res.render('templates/login');
});

router.post('/login', function doLogin(req, res){
  User.login(req.body, function(err, user){
    req.session.regenerate(function (){
      req.session.userId - user._id;
      res.redirect('/');
    })
  })
});

router.get('/new', function newUser(req, res){
  res.render('templates/new-user');
});

router.post('/', function createUser(req, res){
  User.create(req.body, function(err){
    if (err) {
      res.render('user/new', {err: err});
    }else{
      res.redirect('/');
    }
  })
});


module.exports = router;
