var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/login', function loginUser(req, res){
  res.render('templates/login');
});

router.post('/login', function doLogin(req, res){
  User.login(req.body, function(err, user){
    req.session.regenerate(function (){
      req.session.user = user;
      res.redirect('/awesomethings');
    })
  })
});

router.get('/logout', function logoutUser(req, res){
  req.session.regenerate(function(){
    res.redirect('/user/login');
  })
});

router.get('/new', function newUser(req, res){
  req.session.regenerate(function(){
    res.render('templates/new-user');
  })
});

router.post('/', function createUser(req, res){
  User.create(req.body, function(err){
    if (err) {
      res.render('user/new', {err: err});
    }else{
      res.redirect('/user/login');
    }
  })
});


module.exports = router;
