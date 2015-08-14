var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();

var Order = require('../models/ChickenNuggets');

router.get('/', function(req, res){

  Order.findAll(function(err, orders){
    res.render('templates/chicken-index', {orders: formatAllOrders(orders)})
  });

  function formatAllOrders(orders){
    return orders.map(function(order){
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  }
});

router.get('/order', function(req, res){
  res.render('templates/chicken-new');
});

router.post('/order', function(req, res){
  var order = new Order(req.body);

  order.save(function(){
    res.redirect('/chickennuggets');
  })
});

router.post('/order/:id/complete', function(req, res){
  var order = Order.findById(req.params.id);
  order.complete(function(){
    res.redirect('chickennuggets');
  });
});

module.exports = router;












