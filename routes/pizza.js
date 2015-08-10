var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function (req, res) {
  var collection = global.db.collection('pizza');
  collection.find().toArray(function(err, orders){
    var formattedOrders = orders.map(function(order){
      return{
        _id: order._id,
        name: order.name,
        size: order.size,
        toppings: order.toppings,
        createdAt: moment(order._id.getTimestamp()).fromNow()
      }
    });
    res.render('templates/pizza-index', {orders: formattedOrders});
  });
});

router.get('/order', function(req, res){
  res.render('templates/pizza-new');
});

router.post('/order', function(req, res){
  var collection = global.db.collection('pizza');
  collection.save(req.body, function(){
    res.redirect('/pizza');
  });
})

router.post('/order/:id/complete', function(req, res){
  var collection = global.db.collection('pizza');
  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}}, function(){
      res.redirect('/pizza');
  });
});


module.exports = router;
